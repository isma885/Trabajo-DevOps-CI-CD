# Errores

## 1. API no conectada en la BD

```
api-users-1      | UnboundLocalError: cannot access local variable 'cursor' where it is not associated with a value
```

Observamos que el contenedor de la api se levantaba antes de hacer la conexión con la BD incluso apesar de poner `depends_on: - api-users` en el `docker-compose.yaml` así que pusimos esto en `main.py` para forzar la conexión:

```
# Intento de conexión a la base de datos con reintentos
connected = False
retries = 5

while not connected and retries > 0:
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SHOW TABLES;")
        print("Conexión a la base de datos exitosa.")
        connected = True
    except Exception as e:
        print("Error al conectar con la base de datos:", e)
        print(f"Reintentando en 5 segundos... Intentos restantes: {retries}")
        retries -= 1
        time.sleep(5)
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

if not connected:
    print("No se pudo conectar a la base de datos después de varios intentos.")
    exit(1)  # Termina el programa si la conexión falla después de varios intentos
```

Y nos tiró esto:

```                                          
api-users-1      | Error al conectar con la base de datos: 'cryptography' package is required for sha256_password or caching_sha2_password auth methods
```

Ahí nos dimos cuenta de que la solución era añadir `cryptography` en `requirements.txt`

## 2. Problemas con el escaneo de secretos con node

No se instalaba bien python para usar `detect-secrets`. Lo solucionamos usando una imagen de Python en vez de una de ubuntu

## 3. Correcciones en archivos de codigo para que pase el pipeline de LINTING

### a. Espacios adicionales en archivo db_config.py luego del operador =

```
./db_config.py:7:40: E222 multiple spaces after operator
app.config['MYSQL_DATABASE_USER'] = os.environ.get('MYSQL_DATABASE_USER')
app.config['MYSQL_DATABASE_PASSWORD'] =  os.environ.get('MYSQL_DATABASE_PASSWORD')
app.config['MYSQL_DATABASE_DB'] =  os.environ.get('MYSQL_DATABASE_DB')
app.config['MYSQL_DATABASE_HOST'] =  os.environ.get('MYSQL_DATABASE_HOST')  or 'localhost'
app.config['MYSQL_DATABASE_PORT'] =  int(os.environ.get('MYSQL_DATABASE_PORT')) or 3306
```


### b. Línea demasiado larga

#### Línea 1:

```
./db_config.py:9:80: E501 line too long (90 > 79 characters)
```

```
app.config['MYSQL_DATABASE_HOST'] = os.environ.get('MYSQL_DATABASE_HOST')  or 'localhost'
```

Cambie esa linea de 90 caracteres a estas dos:

```
mysql_host = os.environ.get('MYSQL_DATABASE_HOST')
app.config['MYSQL_DATABASE_HOST'] = mysql_host or 'localhost'
```

#### Línea 2

```
./db_config.py:10:80: E501 line too long (87 > 79 characters)
```

```
app.config['MYSQL_DATABASE_PORT'] = int(os.environ.get('MYSQL_DATABASE_PORT')) or 3306
```

La cambie por estas:

```
mysql_port = os.environ.get('MYSQL_DATABASE_PORT')
app.config['MYSQL_DATABASE_PORT'] = int(mysql_port) if mysql_port else 3306
```

### c. En el archivo main.py tambien se hacen correcciones

#### Importaciones sin usar

```
./main.py:3:1: F401 'time' imported but unused
./main.py:6:1: F401 'flask.flash' imported but unused
./main.py:7:1: F401 'werkzeug.security.check_password_hash' imported but unused
```

#### Espacios en blanco

```
./main.py:9:1: E302 expected 2 blank lines, found 1
```

Para esto separe cada uno de los endpoints con dos lineas en blanco en lugar de solo un

#### Indentación

```
./main.py:11:1: W191 indentation contains tabs
```

Para esto cambie todos los tabs por espacio

#### Comentarios

```
./main.py:19:4: E265 block comment should start with '# '
```

Para esto agregue un espacio luego del # en el comentari

#### Línea muy larga

```
./main.py:22:80: E501 line too long (88 > 79 characters)
sql = "INSERT INTO tbl_user(user_name, user_email, user_password) VALUES(%s, %s, %s)"
```

La reemplacé por:

```
sql = (
   "INSERT INTO tbl_user(user_name, user_email, user_password) "
   "VALUES(%s, %s, %s)"
```

#### Espacios en blanco

```
./main.py:36:17: W291 trailing whitespace
```

Le saque el espacio a la linea 
```
        cursor.close()
```

También cambié esta línea y la puse en dos

```
           sql = "UPDATE tbl_user SET user_name=%s, user_email=%s, user_password=%s WHERE user_id=%s"
```

## 4. Error en versiones para hacer el análisis SAST

Al usar njsscan nos aparecía este error:

```
  File "C:\Users\Acer\AppData\Roaming\Python\Python311\site-packages\libsast\core_sgrep\semantic_sgrep.py", line 46, in format_output
    errs = results.get('errors')
           ^^^^^^^^^^^
AttributeError: 'NoneType' object has no attribute 'get'
```

Encontramos en internet que podía llegar a ser un problema de versiones entre njsscan y semgrep.

Lo solucionamos indicando la versión concreta de cada una para poder hacer el análisis:

```
  script:
    - python3 -m venv .venv
    - source .venv/bin/activate
    - pip install njsscan==0.2.2 semgrep==0.38.0
    - njsscan web/ -o ../$ARTIFACT_FILE_NAME
```

## 5. Cambio en api de python para el análisis SCA

Al hacer el análisis SCA nos apareció esto:

```
-> Vulnerability found in pymysql version 1.1.0
   Vulnerability ID: 71083
   Affected spec: <1.1.1
   ADVISORY: PyMySQL 1.1.1 addresses CVE-2024-36039, a critical
   SQL injection vulnerability present in versions up to 1.1.0. This...
   CVE-2024-36039
   For more information about this vulnerability, visit
   https://data.safetycli.com/v/71083/97c
   To ignore this vulnerability, use PyUp vulnerability id 71083 in
   safety’s ignore command-line argument or add the ignore to your safety
   policy file.

-> Vulnerability found in werkzeug version 2.3.7
   Vulnerability ID: 62019
   Affected spec: <2.3.8
   ADVISORY: Werkzeug 3.0.1 and 2.3.8 include a security fix:
   Slow multipart parsing for large parts potentially enabling DoS...
   PVE-2023-62019
   For more information about this vulnerability, visit
   https://data.safetycli.com/v/62019/97c
   To ignore this vulnerability, use PyUp vulnerability id 62019 in
   safety’s ignore command-line argument or add the ignore to your safety
   policy file.

```

Lo solucionamos cambiando las versiones:

```
PyMySQL==1.1.0 -> PyMySQL==1.1.1
Werkzeug==2.3.7 -> Werkzeug==3.0.6
```

## 6. Cambios en api python para el análisis SAST

Bandit detectó que la api estaba configurada para escuchar en todas las interfaces (0.0.0.0)

```
app.run(host='0.0.0.0')
```

Lo solucionamos especificando la interfaz local

```
app.run(host='127.0.0.1')
```

## 7. Cambios en dockerfiles para el docker linting

```
Check: CKV_DOCKER_2: "Ensure that HEALTHCHECK instructions have been added to container images"
	FAILED for resource: python-api/Dockerfile.
	File: python-api/Dockerfile:1-15
	Guide: https://docs.prismacloud.io/en/enterprise-edition/policy-reference/docker-policies/docker-policy-index/ensure-that-healthcheck-instructions-have-been-added-to-container-images
		1  | FROM python:3
		2  | 
		3  | # Copy app
		4  | COPY . /python-api
		5  | 
		6  | WORKDIR /python-api
		7  | 
		8  | # Install dependenceis
		9  | RUN pip install -r requirements.txt
		10 | 
		11 | # Expose port 5000
		12 | EXPOSE 5000
		13 | 
		14 | # Run the server when container is launched
		15 | CMD ["python", "main.py"]
Check: CKV_DOCKER_3: "Ensure that a user for the container has been created"
	FAILED for resource: python-api/Dockerfile.
	File: python-api/Dockerfile:1-15
	Guide: https://docs.prismacloud.io/en/enterprise-edition/policy-reference/docker-policies/docker-policy-index/ensure-that-a-user-for-the-container-has-been-created
		1  | FROM python:3
		2  | 
		3  | # Copy app
		4  | COPY . /python-api
		5  | 
		6  | WORKDIR /python-api
		7  | 
		8  | # Install dependenceis
		9  | RUN pip install -r requirements.txt
		10 | 
		11 | # Expose port 5000
		12 | EXPOSE 5000
		13 | 
		14 | # Run the server when container is launched
		15 | CMD ["python", "main.py"]
```

Para solucionarlo agregamos un enpoint `/health` en las apis y un healthcheck en el `Dockerfile`:

```
HEALTHCHECK CMD curl --fail http://localhost:5000/health || exit 1
```

También agregamos en los `Dockerfile` la creación de un usuario no root:

```
# Crear un usuario no-root
RUN useradd -m myuser

# Cambiar al usuario no-root
USER myuser
```
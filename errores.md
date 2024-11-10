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
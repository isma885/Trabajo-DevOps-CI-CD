# Errores

### 1. API no conectada en la BD

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


### 2. Redireccionamiento del proxy

```
{
    "message": "Not Found: http://api-users:5000/python/users",
    "status": 404
}
```

Tuvimos problemas redireccionando las peticiones del nginx. Lo solucionamos escribiendo bien el rewrite en `nginx.conf`.

```
    location /apipython {
        set $upstream api-users:5000;
        rewrite ^/apipython(.*)$ $1 break;
        proxy_pass         http://$upstream;
    }
```

### 3. Problemas con el escaneo de secretos con node

No se instalaba bien python para usar `detect-secrets`. Lo solucionamos con la siguiente línea en el script del job: `apt install -y --no-install-recommends python3 python3-pip python3-venv nodejs npm`
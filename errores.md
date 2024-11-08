# Errores

1. BD no conectada en la bd

```
api-users-1      | UnboundLocalError: cannot access local variable 'cursor' where it is not associated with a value
```

Solución:

Añadimos `RUN apt-get update && apt-get install -y mysql-client` en el Dockerfile de la api


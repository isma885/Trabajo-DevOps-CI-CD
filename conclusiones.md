# Conclusiones

## Mejoras en el escaneo de secretos

Originalmente, hicimos los jobs de esta manera:

```
scan-secrets-python:
  image: ubuntu
  stage: secrets-scanning
  tags:
    - $TAG
  variables:
    ARTIFACT_FILE_NAME: scan-secrets-python-$ALUMNO.txt
  script:
    - apt update
    - apt install python3 python3-pip python3-virtualenv python3-venv -y
    - python3 -m venv venv
    - source venv/bin/activate
    - pip install detect-secrets
    - cd python-api  # Cambia al directorio de la API de Python
    - detect-secrets scan . --all-files --exclude-files venv/ > "../$ARTIFACT_FILE_NAME"
  artifacts:
    paths:
      - $ARTIFACT_FILE_NAME

```

Apesar de que andaba, era muy lento, e hicimos los siguientes ajustes para mejorar el pipeline:

- **No usamos ubuntu**: en vez de usar una imagen de ubuntu y después instalar python en el script, decidimos que era mejor usar directamente una imagen más específica, en este caso, una de Python. Investigamos y la imagen de ubuntu tiene muchas herramientas, mientras que las imágenes oficiales de Python están optimizadas para contener solo lo necesario para ejecutar python, por lo que tendría mejor rendimiento. Además, usando directamente la imagen de python, no hace falta que instalemos herramientas como pip o virtualenv y ahorramos tiempo de ejecución.

- **Instalar paquetes neesarios únicamente**: investigamos sobre los tres tipos de dependencias que maneja apt en ubuntu (depends, recommends, suggest) y encontramos una opción `--no-install-recommends` que es recomendable para evitar instalación de paquetes adicionales que no son estrictamente necesarios.

- **Uso de caché para las dependencias**: las dependencias quedan almacenadas en caché, acelerando el pipeline en caso de que estas no cambien. En nuestro caso, `node_modules/` y `.venv/`.

- **No escanear archivos de entorno y directorios temporales**: como el objetivo de este scan es analizar código fuente, no queremos escanear directorios irrelevantes. `detect-secrets scan . --all-files --exclude-files "venv/*" --exclude-files "node_modules/*" > "../$ARTIFACT_FILE_NAME"`

- **Artefacto json**: originalmente, el artefacto era un `.txt`. Para mejorar la legibilidad lo cambiamos a `.json`.

- **Escaneo condicional**: antes de instalar dependencias y escanear, pusimos una condición que realiza el escaneo en caso de que la carpeta que queremos escanear tenga cambios. Si no hay cambios, no escanea, ahorrándonos un escaneo innecesario. 

Con estos arreglos, nos quedan los jobs así:

```
scan-secrets-python:
  image: python:3.9-bullseye
  stage: secrets-scanning
  tags:
    - $TAG
  variables:
    ARTIFACT_FILE_NAME: scan-secrets-python-$ALUMNO.json
  cache:
    paths:
      - .venv/
  script:
    - git diff --exit-code python-api/ || (
        python3 -m venv venv
        source venv/bin/activate
        pip install detect-secrets
        cd python-api
        detect-secrets scan . --all-files --exclude-files "venv/*" > "../$ARTIFACT_FILE_NAME"
      )
  artifacts:
    paths:
      - $ARTIFACT_FILE_NAME
```
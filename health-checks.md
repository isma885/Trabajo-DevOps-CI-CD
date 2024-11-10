# Cómo probar

### 1. API con Python

(Agregar endpoints y cómo probarlos)

`localhost:8080/apipython`

### 2. API con Node

`localhost:8080/apinode/test`

### 3. React

`curl http://localhost:8080/react/`



curl http://localhost:8080/react/










### Correcciones en archivos de codigo para que pase el pipeline de LINTING

# 1 Espacios adicionales en archivo db_config.py luego del operador =
./db_config.py:7:40: E222 multiple spaces after operator
app.config['MYSQL_DATABASE_USER'] = os.environ.get('MYSQL_DATABASE_USER')
app.config['MYSQL_DATABASE_PASSWORD'] =  os.environ.get('MYSQL_DATABASE_PASSWORD')
app.config['MYSQL_DATABASE_DB'] =  os.environ.get('MYSQL_DATABASE_DB')
app.config['MYSQL_DATABASE_HOST'] =  os.environ.get('MYSQL_DATABASE_HOST')  or 'localhost'
app.config['MYSQL_DATABASE_PORT'] =  int(os.environ.get('MYSQL_DATABASE_PORT')) or 3306


# 2 Linea demasiado larga
./db_config.py:9:80: E501 line too long (90 > 79 characters)
app.config['MYSQL_DATABASE_HOST'] = os.environ.get('MYSQL_DATABASE_HOST')  or 'localhost'
# Cambie esa linea de 90 caracteres a estas dos:
mysql_host = os.environ.get('MYSQL_DATABASE_HOST')
app.config['MYSQL_DATABASE_HOST'] = mysql_host or 'localhost'

./db_config.py:10:80: E501 line too long (87 > 79 characters)
app.config['MYSQL_DATABASE_PORT'] = int(os.environ.get('MYSQL_DATABASE_PORT')) or 3306
# La cambie por estas:
mysql_port = os.environ.get('MYSQL_DATABASE_PORT')
app.config['MYSQL_DATABASE_PORT'] = int(mysql_port) if mysql_port else 3306

# 3 En el archivo main.py tambien se hacen correcciones
./main.py:3:1: F401 'time' imported but unused
./main.py:6:1: F401 'flask.flash' imported but unused
./main.py:7:1: F401 'werkzeug.security.check_password_hash' imported but unused
# Elimine estas tres importaciones

./main.py:9:1: E302 expected 2 blank lines, found 1
# Para esto separe cada uno de los endpoints con dos lineas en blanco en lugar de solo un
./main.py:11:1: W191 indentation contains tabs
# Para esto cambie todos los tabs por espacio
./main.py:19:4: E265 block comment should start with '# '
# Para esto agregue un espacio luego del # en el comentari
./main.py:22:80: E501 line too long (88 > 79 characters)
sql = "INSERT INTO tbl_user(user_name, user_email, user_password) VALUES(%s, %s, %s)"
# La reemplaze por :
sql = (
   "INSERT INTO tbl_user(user_name, user_email, user_password) "
   "VALUES(%s, %s, %s)"
./main.py:36:17: W291 trailing whitespace
# Le saque el espacio a la linea 
        cursor.close()
# Tambien cambie esta linea y la puse en dos
           sql = "UPDATE tbl_user SET user_name=%s, user_email=%s, user_password=%s WHERE user_id=%s"



### Estos son los jobs que se pueden utilizar para el build inidividual de cada imagen ###

# buil de la api python
dockerize-api:
  image: docker
  stage: build
  tags: [$TAG]
  variables:
    DOCKER_IMAGE_NAME: $CI_REGISTRY/python-api-$ALUMNO:1.0.0
    DOCKER_IMAGE_LATEST: $CI_REGISTRY/python-api-$ALUMNO:latest
    DOCKER_BUILDKIT: "1"
    DOCKER_DRIVER: overlay2
    DOCKER_HOST: tcp://docker:2375
    DOCKER_TLS_CERTDIR: ""
    CA_CERTIFICATE: "$CA_CERTIFICATE"
  services:
    - name: docker:24.0.2-dind
      alias: docker
      command:
      - /bin/sh
      - -c
      - echo "$CA_CERTIFICATE" > /usr/local/share/ca-certificates/my-ca.crt && update-ca-certificates && dockerd-entrypoint.sh || exit
  before_script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" $CI_REGISTRY
  script:
    - docker build --pull -t "$DOCKER_IMAGE_NAME" -t "$DOCKER_IMAGE_LATEST" python-api/
    - docker push "$DOCKER_IMAGE_NAME"
    - docker push "$DOCKER_IMAGE_LATEST"
  rules:
    - if: $CI_COMMIT_BRANCH
      exists:
        - python-api/Dockerfile
  allow_failure: true


# build de la api node
dockerize-api:
  image: docker
  stage: build
  tags: [$TAG]
  variables:
    DOCKER_IMAGE_NAME: $CI_REGISTRY/node-api-$ALUMNO:1.0.0
    DOCKER_IMAGE_LATEST: $CI_REGISTRY/node-api-$ALUMNO:latest
    DOCKER_BUILDKIT: "1"
    DOCKER_DRIVER: overlay2
    DOCKER_HOST: tcp://docker:2375
    DOCKER_TLS_CERTDIR: ""
    CA_CERTIFICATE: "$CA_CERTIFICATE"
  services:
    - name: docker:24.0.2-dind
      alias: docker
      command:
      - /bin/sh
      - -c
      - echo "$CA_CERTIFICATE" > /usr/local/share/ca-certificates/my-ca.crt && update-ca-certificates && dockerd-entrypoint.sh || exit
  before_script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" $CI_REGISTRY
  script:
    - docker build --pull -t "$DOCKER_IMAGE_NAME" -t "$DOCKER_IMAGE_LATEST" node-api/
    - docker push "$DOCKER_IMAGE_NAME"
    - docker push "$DOCKER_IMAGE_LATEST"
  rules:
    - if: $CI_COMMIT_BRANCH
      exists:
        - node-api/Dockerfile
  allow_failure: true


# build de react
dockerize-api:
  image: docker
  stage: build
  tags: [$TAG]
  variables:
    DOCKER_IMAGE_NAME: $CI_REGISTRY/web-$ALUMNO:1.0.0
    DOCKER_IMAGE_LATEST: $CI_REGISTRY/web-$ALUMNO:latest
    DOCKER_BUILDKIT: "1"
    DOCKER_DRIVER: overlay2
    DOCKER_HOST: tcp://docker:2375
    DOCKER_TLS_CERTDIR: ""
    CA_CERTIFICATE: "$CA_CERTIFICATE"
  services:
    - name: docker:24.0.2-dind
      alias: docker
      command:
      - /bin/sh
      - -c
      - echo "$CA_CERTIFICATE" > /usr/local/share/ca-certificates/my-ca.crt && update-ca-certificates && dockerd-entrypoint.sh || exit
  before_script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" $CI_REGISTRY
  script:
    - docker build --pull -t "$DOCKER_IMAGE_NAME" -t "$DOCKER_IMAGE_LATEST" web/
    - docker push "$DOCKER_IMAGE_NAME"
    - docker push "$DOCKER_IMAGE_LATEST"
  rules:
    - if: $CI_COMMIT_BRANCH
      exists:
        - web/Dockerfile
  allow_failure: true


dockerize-db:
  image: docker
  stage: build
  tags: [$TAG]
  variables:
    DOCKER_IMAGE_NAME: $CI_REGISTRY/db-$ALUMNO:1.0.0
    DOCKER_IMAGE_LATEST: $CI_REGISTRY/db-$ALUMNO:latest
    DOCKER_BUILDKIT: "1"
    DOCKER_DRIVER: overlay2
    DOCKER_HOST: tcp://docker:2375
    DOCKER_TLS_CERTDIR: ""
    CA_CERTIFICATE: "$CA_CERTIFICATE"
  services:
    - name: docker:24.0.2-dind
      alias: docker
      command:
      - /bin/sh
      - -c
      - echo "$CA_CERTIFICATE" > /usr/local/share/ca-certificates/my-ca.crt && update-ca-certificates && dockerd-entrypoint.sh || exit
  before_script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" $CI_REGISTRY
  script:
    - docker build --pull -t "$DOCKER_IMAGE_NAME" -t "$DOCKER_IMAGE_LATEST" db/
    - docker push "$DOCKER_IMAGE_NAME"
    - docker push "$DOCKER_IMAGE_LATEST"
  rules:
    - if: $CI_COMMIT_BRANCH
      exists:
        - db/Dockerfile
  allow_failure: true

dockerize-nginx:
  image: docker
  stage: build
  tags: [$TAG]
  variables:
    DOCKER_IMAGE_NAME: $CI_REGISTRY/nginx-$ALUMNO:1.0.0
    DOCKER_IMAGE_LATEST: $CI_REGISTRY/nginx-$ALUMNO:latest
    DOCKER_BUILDKIT: "1"
    DOCKER_DRIVER: overlay2
    DOCKER_HOST: tcp://docker:2375
    DOCKER_TLS_CERTDIR: ""
    CA_CERTIFICATE: "$CA_CERTIFICATE"
  services:
    - name: docker:24.0.2-dind
      alias: docker
      command:
      - /bin/sh
      - -c
      - echo "$CA_CERTIFICATE" > /usr/local/share/ca-certificates/my-ca.crt && update-ca-certificates && dockerd-entrypoint.sh || exit
  before_script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" $CI_REGISTRY
  script:
    - docker build --pull -t "$DOCKER_IMAGE_NAME" -t "$DOCKER_IMAGE_LATEST" nginx/
    - docker push "$DOCKER_IMAGE_NAME"
    - docker push "$DOCKER_IMAGE_LATEST"
  rules:
    - if: $CI_COMMIT_BRANCH
      exists:
        - nginx/Dockerfile
  allow_failure: true

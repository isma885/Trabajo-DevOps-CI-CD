# TP Integrador 2024

## Requisitos
1. Python 3.x
2. Cliente MySQL. ej: Dbeaver, https://dbeaver.io/download/ 
3. Docker, docker compose
4. Node
5. REACT

## Objetivo
Aplicar conocimientos adquiridos en la materia Desarrollo y Operaciones para mejorar el CI/CD del proyecto dados, compuesto de 3 microservicios utilizando un proxy para que tanto front y back salgan por el mismo dominio.

## Objetivos específicos
- Automatizar los procesos de build y deploy de los microservicios dados para mejorar la entrega continua
- Automatizar analisis de SAST del producto mitigando las vulnerabilidades actuales conocidas y teniendo en cuenta las buenas practicas.
- Proponer mejoras al trabajo entregado
- Documentar errores y soluciones aplicadas.

## Metodología
- Las soluciones propuestas serán presentadas en vivo, durante el horario de clases, de forma presencial.
- Todos los puntos solicitados deberán quedar en los repositorios creados y distribuidos para este TP, proyecto que no este subido su ultima versión en la rama main (o la rama default) no será considerado al momento de cargar a nota.
- Durante la presentación podemos realizar preguntas conceptuales.

## Puntos de entrega
### 1. Pipeline en el repositorio
>No debe haber secretos hardcodeados en los archivos del repositorio
#### 1.1 Seguridad en el Repositorio
- Escaneo de Secretos. Para cada microservicio
#### 1.2 Escaneo/Linting de Código
- Para cada microservicio. El unico excento es el de BD. Debe generar artefactos
#### 1.3 Build
- 1 Base de datos.
- 2 APIs en Distinto Lenguaje expuestos por medio del NGINX
    - Python
    - Node 
- 1 Front End en NGINX
    - REACT
- Push al Registry del LabSis
#### 1.4 Escaneo/Linting de Docker
- Estático y Linting.  Para cada microservicio. Debe generar artefactos
#### 1.5 Deploy
- Usando SSH
- Mostrar que los containers están corriendo

### 2. Bitácora de pipeline ejecutado
En un archivo `pipeline.md` en el repositorio adjuntar imagenes de un pipeline exitoso e imagenes de cada uno de los jobs. Linkeado a esta sección.
> Las imágenes que se agreguen a los md colocarlas en una carpeta `imgs` en la raíz

### 2. Verificación de deploy
En un archivo `health-checks.md` en el repositorio. Linkeado a esta sección.
Este archivo debe tenes como verificar cada servicio deployado

### 2. Glosario de errores
En un archivo `errores.md` en el repositorio. Linkeado a esta sección.
- Errores que enfrentaron: identificación de error y cómo lo solucionaron

### 3. Conclusiones
En un archivo `conclusiones.md` en el repositorio. Linkeado a esta sección.
Posibles mejoras al pipeline? Puntos de mejora



## Material
- Documentación oficial correspondiente
- Clases
- Chat GPT (importante que entiendan las respuesta que estan copiando/utilizando)

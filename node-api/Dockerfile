# Usar una imagen base de Node.js
FROM node:16

# Crear el directorio de la aplicación
WORKDIR /app

# Copiar los archivos del proyecto
COPY . .

RUN npm set timeout 600000
# Instalar las dependencias
RUN npm install

# Exponer el puerto 1000
EXPOSE 1000

# Iniciar la aplicación
CMD ["npm", "start"]

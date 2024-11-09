FROM node:16

# Copy app
COPY . /web

WORKDIR /web

# Instala dependencias
RUN npm install

# Compila el proyecto de React para producción
RUN npm run build

# Expone el puerto para el desarrollo de React
EXPOSE 3000

# Comando para iniciar la aplicación de desarrollo
CMD ["npm", "start"]

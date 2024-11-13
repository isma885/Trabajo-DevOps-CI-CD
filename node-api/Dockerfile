FROM node:16

RUN groupadd -r appgroup && useradd -r -g appgroup appuser

WORKDIR /app

COPY . .
RUN chown -R appuser:appgroup /app

USER appuser

RUN npm set timeout 600000
RUN npm install

EXPOSE 1000

HEALTHCHECK CMD curl --fail http://localhost:1000/health || exit 1

CMD ["npm", "start"]

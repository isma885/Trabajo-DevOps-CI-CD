FROM node:16

RUN useradd -ms /bin/bash appuser && mkdir -p /app/appuser && chown -R appuser:appuser /app/appuser
WORKDIR /app/appuser

COPY . .

RUN npm set timeout 600000
RUN npm install

EXPOSE 1000

USER appuser

HEALTHCHECK CMD curl --fail http://localhost:1000/health || exit 1

CMD ["npm", "start"]

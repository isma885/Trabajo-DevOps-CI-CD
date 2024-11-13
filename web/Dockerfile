FROM node:16

RUN useradd -m appuser

COPY . /web

WORKDIR /web

RUN chown -R appuser /web

RUN npm install

RUN npm run build

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

CMD ["npm", "start"]

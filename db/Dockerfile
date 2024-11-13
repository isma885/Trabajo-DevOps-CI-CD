FROM mysql:8.4.2

RUN groupadd -r appuser && useradd -r -g appuser appuser

COPY ./init-scripts/* /docker-entrypoint-initdb.d/

RUN chown -R appuser:appuser /docker-entrypoint-initdb.d/

USER appuser

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD mysqladmin ping -h localhost || exit 1

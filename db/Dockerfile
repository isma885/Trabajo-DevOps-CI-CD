FROM mysql:8.4.2

COPY ./init-scripts/* /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD mysqladmin ping -h localhost || exit 1
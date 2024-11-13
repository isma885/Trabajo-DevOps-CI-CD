FROM nginx:1.27.1-alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
USER nginx
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:80 || exit 1
CMD ["nginx", "-g", "daemon off;"]

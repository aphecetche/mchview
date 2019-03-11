FROM nginx:stable-alpine

COPY config.sh /
COPY dist/* /usr/share/nginx/html/
CMD ["/config.sh"]


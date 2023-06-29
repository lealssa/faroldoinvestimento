FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/

COPY ./vue3_cdn ./html
COPY ./nginx_default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
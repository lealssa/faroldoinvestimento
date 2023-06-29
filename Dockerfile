FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/

COPY ./vue3_cdn ./html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
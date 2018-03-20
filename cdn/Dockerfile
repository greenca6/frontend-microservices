FROM nginx

RUN rm -rf /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/
COPY assets/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

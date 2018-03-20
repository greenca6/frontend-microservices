FROM node

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD yarn start
#RUN cat build/index.html
#
#FROM nginx
#
#RUN rm -rf /usr/share/nginx/html
#
#COPY --from=build /app/build /usr/share/nginx/html

FROM node:20.11-alpine as build

WORKDIR /usr/app
COPY . /usr/app

COPY .env.production /usr/app/

RUN npm ci
RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html
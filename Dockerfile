FROM node:21-alpine as build-stage

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
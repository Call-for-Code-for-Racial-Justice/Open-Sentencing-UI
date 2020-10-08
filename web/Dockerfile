FROM node:10-alpine as client
RUN mkdir /app
WORKDIR /app
COPY package.json ./package.json
RUN npm install
COPY tsconfig.json ./tsconfig.json
COPY tslint.json ./tslint.json
COPY angular.json ./angular.json
COPY tsconfig.app.json ./tsconfig.app.json
COPY src ./src
RUN npm run build
FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=client /app/dist/client /usr/share/nginx/html

FROM node:10-alpine as builder
RUN apk -U upgrade
RUN mkdir /app
WORKDIR /app
COPY web /app
RUN npx npm-force-resolutions
RUN npm install
RUN npm run build

FROM nginx:alpine
RUN apk -U upgrade
COPY web/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/client /usr/share/nginx/html

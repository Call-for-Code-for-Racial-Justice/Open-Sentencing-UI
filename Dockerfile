FROM node:10-alpine as builder
RUN mkdir /app
WORKDIR /app
COPY web /app
RUN npx npm-force-resolutions
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/client /usr/share/nginx/html

FROM node:alpine AS builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
CMD ["ng", "serve"]

FROM nginx:alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html/
COPY /nginx.conf /etc/nginx/conf.d/default.conf



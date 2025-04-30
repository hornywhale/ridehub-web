# Stage 1: Build the Angular app
FROM node:23.11.0 AS build

WORKDIR /app

# Устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем все исходники
COPY . .

# Собираем приложение в продакшн-режиме
RUN npm run build --prod

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Копируем собранное приложение из первого этапа в директорию Nginx
COPY --from=build /app/dist/ridehub /usr/share/nginx/html


COPY nginx.conf /etc/nginx/nginx.conf
COPY fullchain.pem /home/fullchain.pem
COPY privkey.pem /home/privkey.pem
COPY ssl-dhparams.pem /home/ssl-dhparams.pem

# Копируем кастомный конфиг Nginx (если есть)

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


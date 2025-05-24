# Вихідний образ Node.js
FROM node:18

# Створення робочої директорії
WORKDIR /app

# Копіюємо package.json і package-lock.json
COPY package*.json ./

# Встановлення залежностей
RUN npm install

# Копіюємо весь код
COPY . .

# Вказуємо порт, який слухає додаток
EXPOSE 8080

# Команда запуску
CMD ["node", "server.js"]

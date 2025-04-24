FROM node:22-slim
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 1000
CMD ["npm", "start"]
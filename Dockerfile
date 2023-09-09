# Stage 1: Build the React application
FROM node:17-alpine3.15

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]
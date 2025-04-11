FROM node:20-alpine

WORKDIR /app

# This will copy the package.json and package-lock.json files to the container
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

FROM node:18

WORKDIR /app

COPY package.json ./

RUN npm install -g bun
RUN bun install

COPY . .

EXPOSE 8080

CMD ["bun", "run", "src/index.ts"]

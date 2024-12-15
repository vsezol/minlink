FROM node:22-alpine

WORKDIR /app

COPY dist/apps/core .

RUN npm i --omit=dev

ENV PORT=3000

EXPOSE 3000

CMD ["node", "main.js"]

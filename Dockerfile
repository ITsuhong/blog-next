FROM node AS build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

FROM node  AS runtime

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY --from=build /app/.next ./.next

COPY --from=build /app/public ./public

EXPOSE 3000

USER node

CMD ["npm", "start"]
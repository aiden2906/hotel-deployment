FROM node:12.18.2-alpine as buildSrc
RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . /app/
ENV NODE_ENV=staging
RUN npm run build


FROM node:12.11-alpine as buildDeps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY --from=buildSrc /app/dist ./dist
COPY .env ./.env
COPY dump ./dump
CMD [ "node", "dist/main.js" ]

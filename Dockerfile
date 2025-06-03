FROM node:22-alpine
LABEL authors="cliftoncraig"

# Add npm using apk
RUN apk add --no-cache npm

ENV NODE_ENV production
ENV PORT 3000

WORKDIR /app

#Add vite globally
RUN npm install -g vite
COPY package*.json ./
RUN npm install

COPY . .
RUN npm install
RUN npm run build

ENTRYPOINT ["npm", "run", "start"]
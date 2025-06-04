FROM node:22-alpine
LABEL authors="cliftoncraig"

ENV NODE_ENV=production
ENV PORT=80

WORKDIR /app

COPY package*.json ./
# Install all dependencies, including devDependencies, for the build.
# The --production=false flag overrides NODE_ENV=production for this command.
RUN npm install --production=false

COPY . .
RUN npm run build

EXPOSE 80
ENTRYPOINT ["npm", "run", "start"]

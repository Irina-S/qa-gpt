FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN npm install -g http-server
RUN npm install
RUN npm run build
ENTRYPOINT http-server dist -p 3000

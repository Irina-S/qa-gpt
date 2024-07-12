FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN npm install -g http-server
RUN npm install
EXPOSE 8080
RUN npm run build
ENTRYPOINT http-server build -p 8080

FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN npm install -g lite-server
RUN npm install
RUN npm run build
ENTRYPOINT lite-server  --baseDir="dist" -p 8080

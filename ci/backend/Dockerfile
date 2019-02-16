FROM node:8

RUN apt-get update && apt-get upgrade -y
RUN apt-get install --no-install-recommends -y nodejs

RUN npm install -g nodemon

USER node

WORKDIR /backend
RUN npm install

EXPOSE 8080

CMD [ "nodemon", "js/server.js" ]

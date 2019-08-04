FROM node:8

RUN	apt-get update && apt-get upgrade -y
RUN apt-get install --no-install-recommends -y nodejs

RUN npm install -g @vue/cli

USER node

WORKDIR /frontend
RUN npm install

EXPOSE 8081

CMD [ "npm", "run", "serve" ]

# Base Node.js
FROM node:latest

WORKDIR /usr/src/app
COPY aroundtech_v2/package.json aroundtech_v2/package-lock.json /usr/src/app/
COPY aroundtech_v2/public /usr/src/app/public
COPY aroundtech_v2/src /usr/src/app/src

# Installer les dépendances
RUN npm install
RUN npm install --save

ENV REACT_APP_BACK_URL=http://localhost:8081/

CMD ["npm", "start"]
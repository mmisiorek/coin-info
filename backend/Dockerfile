FROM node:8.9

RUN npm install -g nodemon jasmine
RUN mkdir code

WORKDIR /home/node/code
COPY . /home/node/code

RUN rm -rf package-lock.json node_modules/

RUN npm install

CMD ["npm", "run", "develop"]

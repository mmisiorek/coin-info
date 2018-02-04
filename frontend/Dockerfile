FROM alpine:3.6

RUN apk add --no-cache nodejs nodejs-npm bash
RUN npm install -g npx neutrino

RUN addgroup -g 1000 node \
    && adduser -u 1000 -G node -s /bin/bash -D node
WORKDIR /home/node/code

RUN mkdir code
COPY . .
RUN rm -rf node_modules
RUN npm install

RUN chown -R node:node /home/node/code
USER node

CMD ["npm", "start"]

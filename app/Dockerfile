FROM node:16.16.0

# #COPY .yarnrc /.yarnrc
# # TODO - may want to write .yarnrc file here
COPY yarn.lock /yarn.lock
COPY package.json /package.json
COPY tsconfig.json /tsconfig.json

# keep node_modules at the root, to keep them out of our app volume
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /app
COPY . /app

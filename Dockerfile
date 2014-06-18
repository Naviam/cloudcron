FROM node

ADD . /usr/src/cloudcron
WORKDIR /usr/src/cloudcron

# install your application's dependencies
RUN apt-get install gcc make build-essential
RUN npm install
RUN npm install -g bower
RUN bower install --allow-root
RUN cd bower_components;ls

# replace this with your application's default port
EXPOSE 3000

# replace this with your main "server" script file
CMD [ "node", "app.js" ]
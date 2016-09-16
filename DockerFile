FROM node
#apt-get:
RUN apt-get update && apt-get install -y git && apt-get install -y mongodb && mkdir -p /data/db

#Global npm installs:
RUN npm install -g bower && npm install -g grunt-cli

#Git clone project and setup:
RUN git clone https://github.com/SweatyFigs/SweatyFigs.git
WORKDIR "/SweatyFigs"
RUN cp ./server/env/config_sample.js ./server/env/config.js && echo '{ "allow_root": true }' > /root/.bowerrc

#Install dependencies:
RUN npm install
RUN bower install

#Start daemons:
RUN mongod --fork --logpath ./mongod.log
#RUN npm start

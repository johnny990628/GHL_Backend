FROM ubuntu:22.04
MAINTAINER luckypig3400

# install app dependencies
RUN apt update
RUN apt install git -y
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install nodejs -y
RUN apt clean

# Set Work Directory
WORKDIR /home

# install app
RUN git clone https://github.com/johnny990628/GHL_Backend.git
WORKDIR /home/GHL_Backend
RUN npm install
RUN npm install bcrypt
# https://stackoverflow.com/questions/15809611/bcrypt-invalid-elf-header-when-running-node-app

# final configuration
EXPOSE 3080
CMD node server.js
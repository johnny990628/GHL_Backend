FROM mongo:6.0.3
MAINTAINER luckypig3400

# install app dependencies
RUN apt update
RUN apt install git -y
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install nodejs -y
RUN apt clean

# Set Work Directory
WORKDIR /home/GHL_backend

# install app
COPY ./ ./
RUN npm install
RUN npm install bcrypt
# https://stackoverflow.com/questions/15809611/bcrypt-invalid-elf-header-when-running-node-app

# final configuration
ENV GHL_backend_HOME=/home/GHL_backend
EXPOSE 3080
# CMD cd GHL_backend_HOME #有設定WORKDIR, 這行與上方那行的ENV已經使用不到了
CMD node server.js
# https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together
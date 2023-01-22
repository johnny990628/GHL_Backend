FROM mongo:6.0.3
MAINTAINER luckypig3400

# install app dependencies
RUN apt update
RUN apt install git -y
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install nodejs -y
RUN apt clean

# install app
RUN cd home
RUN git clone https://github.com/johnny990628/GHL_backend.git
RUN cd GHL_backend
RUN npm install
RUN npm install pm2 -g

# final configuration
ENV GHL_backend_HOME=/home/GHL_backend
EXPOSE 3080
CMD cd GHL_backend_HOME
CMD pm2 start server.js
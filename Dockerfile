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

# Add default GLC user in MongoDB
RUN mongod --fork --logpath /home/GHL_backend/mongodb.log && mongosh ghl --eval 'db.users.insertOne({"username": "admin","password": "$2b$10$0Dv2Y4EkFlJwEdAC2.P9Mu9.gwv.bDgjUPewF35UQATYEjDMJwFdm","name": "admin","role": 3,"createdAt": 1674477502677,"updatedAt":1674477502677,"__v": 0});'

# final configuration
ENV GHL_backend_HOME=/home/GHL_backend
# CMD cd GHL_backend_HOME #有設定WORKDIR, 這行與上方那行的ENV已經使用不到了
EXPOSE 3080
CMD mongod --fork --logpath /home/GHL_backend/mongodb.log && node server.js
# 啟動Container時自動啟動mongodb 與 GHL_backend
# https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together

# ------------------------------------
# 把image發佈到Docker Hub上的操作紀錄
# 先把local端的image用remote端命名並加上tag
# docker image tag ghl_backend:latest kiwiteam/glc:ghl_backend_latest
# docker image tag ghl_backend:latest kiwiteam/glc:ghl_backend_v1.0.0
# 最後把標上remote tag 的images push 到Docker Hub上
# docker image push --all-tags kiwiteam/glc
# ------------------------------------
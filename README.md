# GHL_Backend
GHL_Backend is a noSQL-based NodeJS server for managing the medical reports built on [Express](https://expressjs.com/zh-tw/) .

![](https://github.com/johnny990628/GHL_Frontend/blob/master/public/ghl.gif)
<img src="https://github.com/johnny990628/GHL_Frontend/blob/master/public/logo.png" width="20%" />

## TODO List
- [x] pull FHIR Branch from [Kiwi-FHIR-Convert-Kit](https://github.com/Yang-Jiaxiang/Kiwi-FHIR-Convert-Kit)
- [x] test FHIR api
- [x] merge FHIR Branch
- [ ] Complete [TWcore](https://twcore.mohw.gov.tw/ig/profiles-and-extensions.html) track1 [FHIR Patient](https://twcore.mohw.gov.tw/ig/StructureDefinition-Patient-twcore.html) api requirements
- [ ] Docker compose file

## Requirements
- [Node.js](https://nodejs.org/zh-tw/download/) >= 16
- [MongoDB](https://www.mongodb.com/) >= 5
- [Express](https://expressjs.com/zh-tw/) > 4

## Installation
### Step1-Clone the repo
```bash
git clone https://github.com/johnny990628/GHL_backend
cd GHL_backend
```

### Step2-Install dependencies
```bash
npm install
```

### Step3-Configuration

#### Modify your `.env` file in root folder

#### dotenv template
```bash
PORT="3090"
DB_URL="mongodb://localhost:27017/ghl"
WEB_ORIGIN_URL="http://localhost:3091"
JWT_SECRECT_KEY="your jwt secrect key"
```

### Step4-Deploy
```bash
node server.js
```

## API Documentation
### Visit this URL after you deployed the server
+ http://localhost:3080/api-doc/

**port 3080 should match your `.env` config**

## Deploy with Docker
```bash
git clone https://github.com/johnny990628/GHL_backend.git
cd GHL_backend
build-docker-image.bat
docker run -d -p 3090:3080 --name GHL_Backend -it --restart=always ghl_backend
```

### 使用Docker的注意事項
+ 如果你已經在Local端成功架設前後端並且順利登入，請記得要登出後再執行前後端的Docker Container，否則你的前端會無法順利運作

## Author 🎉
[johnny990628](https://github.com/johnny990628)

## References
+ [Docker Port Mapping](https://www.baeldung.com/linux/assign-port-docker-container#:~:text=Port%20mapping%20is%20used%20to,redirected%20into%20the%20Docker%20container.)
+ [Docker node container exited](https://stackoverflow.com/questions/44288504/why-is-my-docker-node-container-exiting)
+ [Docker Run with command](https://docs.docker.com/engine/reference/commandline/run/)
+ [Install specific NodeJS version in Ubuntu](https://www.educative.io/answers/how-to-install-nodejs-on-ubuntu)
+ [Day5: 實作撰寫第一個 Dockerfile](https://ithelp.ithome.com.tw/articles/10191016)
+ [Docker Packaging your software](https://docs.docker.com/build/building/packaging/)
+ [解決Dockerfile RUN npm install找不到package.json](https://ithelp.ithome.com.tw/articles/10204227)
+ [Node bcrypt套件在Linux上Error](https://stackoverflow.com/questions/15809611/bcrypt-invalid-elf-header-when-running-node-app)
+ [在Docker內無需使用pm2](https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together)
+ [Run MongoDB as background service in Linux](https://serverfault.com/questions/157705/how-can-i-run-mongod-in-the-background-on-unix-mac-osx)
+ [Dockerfile CMD multiple commands](https://stackoverflow.com/questions/46797348/docker-cmd-exec-form-for-multiple-command-execution)
+ [Push image to Docker Hub](https://docs.docker.com/engine/reference/commandline/push/)
+ [MongoDB insert data](https://www.mongodb.com/docs/manual/reference/method/db.collection.insert/)
+ [透過mongosh cli直接新增資料到MongoDB](https://stackoverflow.com/questions/4837673/how-to-execute-mongo-commands-through-shell-scripts)
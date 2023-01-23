# GHL_Backend
GHL_Backend is a noSQL-based NodeJS server for managing the medical reports built on [Express](https://expressjs.com/zh-tw/) .

![](https://github.com/johnny990628/GHL_Frontend/blob/master/public/ghl.gif)
<img src="https://github.com/johnny990628/GHL_Frontend/blob/master/public/logo.png" width="20%" />

## TODO List
- [ ] pull FHIR Branch from [Yang-Jiaxiang](https://github.com/Yang-Jiaxiang/GHL_BackendToFHIR)
- [ ] test FHIR api
- [ ] merge FHIR Branch
- [ ] Complete track1 FHIR api requirement
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

## Deploy with Docker
```bash
git clone https://github.com/johnny990628/GHL_backend.git
cd GHL_backend
build-docker-image.bat
docker run -d -p 3090:3080 --name GHL_Backend -it --restart=always ghl_backend
```

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
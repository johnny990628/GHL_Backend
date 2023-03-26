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

### 最新版Docker部署方式已遷移至以下Repo
+ https://github.com/luckypig3400/GLC_Docker-compose_plus_Dockerfiles

### 不再維護的Dockerfile建置參考指令
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
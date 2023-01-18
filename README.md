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

## Author 🎉
[johnny990628](https://github.com/johnny990628)

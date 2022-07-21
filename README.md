# GHL_Backend
GHL_Backend is a noSQL-based NodeJS server for managing the medical reports built on [Express](https://expressjs.com/zh-tw/) .

![](https://github.com/johnny990628/GHL_Frontend/blob/master/public/ghl.gif)
<img src="https://github.com/johnny990628/GHL_Frontend/blob/master/public/logo.png" width="20%" />

## Installation

#### requirement
- [Node.js](https://nodejs.org/zh-tw/download/) >= 16
- [MongoDB](https://www.mongodb.com/) >= 5
- [Express](https://expressjs.com/zh-tw/) > 4

#### Clone the repo
```bash
git clone https://github.com/johnny990628/GHL_backend
cd GHL_backend
```

#### Install dependencies
```bash
npm install
```

## Configuration

#### dotenv

```bash
PORT="your server port"
DB_URL="mongodb://localhost:27017/ghl"
WEB_ORIGIN_URL="your web app port"
JWT_SECRECT_KEY="jwt secrect key"
```

#### Deploy
```bash
node server.js
```

## Author
[johnny990628](https://github.com/johnny990628)

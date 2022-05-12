const swaggerAutogen = require('swagger-autogen')()

const doc = {
    host: 'localhost:3080',
    tags: [
        {
            name: 'Patients',
            description: '病人',
        },
        {
            name: 'Reports',
            description: '報告',
        },
        {
            name: 'Users',
            description: '使用者',
        },
        {
            name: 'Auth',
            description: '驗證',
        },
        {
            name: 'Roles',
            description: '使用者等級',
        },
        {
            name: 'Department',
            description: '部門',
        },
        {
            name: 'Schedule',
            description: '排程',
        },
    ],
}

const outputFile = './swagger_output.json' // 輸出的文件名稱
const endpointsFiles = ['./server.js'] // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以

swaggerAutogen(outputFile, endpointsFiles, doc) // swaggerAutogen 的方法

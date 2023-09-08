const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")
const path = require('path');


const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "MemoryMingle",
            description:
                "친구, 지인들과 추억을 공유하는 서비스",
        },
        servers: [
            {
                url: "http://localhost:3000", // 요청 URL
            },
        ],
    },
    apis: [path.resolve(__dirname, '../src/routes/**/*.js')],
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }
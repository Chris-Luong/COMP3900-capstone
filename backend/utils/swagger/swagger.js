const swaggerAutogen = require('swagger-autogen')();


const outputFile = '../../swagger.json';
const routes =  ['../../routes/*.js']

swaggerAutogen(outputFile, routes)
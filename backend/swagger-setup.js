
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const definition = {
    info: {
        title: 'Project QueueQuicker',
          version: '1.0.0',
          description: 'API documentation for QueueQuicker System',
    },
    servers: [
        {
          url: 'http://localhost:8800/'
        }
      ]
}
  
const options = {
  definition,
 apis: ["./routes/*.route.js"]
};
  

const swaggerSetup = app => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));

module.exports = swaggerSetup;

const routes =  ['../routes/*.js']
doc = {
  definition: {
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
  },
  apis: routes
}; 


module.exports = doc;
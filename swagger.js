const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library Management API',
    description: 'API for managing books and authors with OAuth authentication',
    version: '1.0.0'
  },
  host: 'library-api-nzj4.onrender.com', 
  basePath: '/',
  schemes: ['https'],
  securityDefinitions: {
    github: {
      type: 'oauth2',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      flow: 'implicit'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
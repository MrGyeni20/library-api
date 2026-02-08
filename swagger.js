const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library Management API',
    description: 'API for managing books and authors'
  },
  host: 'cse341-l0tm.onrender.com',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
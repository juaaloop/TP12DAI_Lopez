const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Gestión de Productos',
    description: 'Documentación interactiva con Swagger para el Trabajo Práctico.',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Producto: {
      id: 1,
      nombre: "Notebook Lenovo",
      precio: 850000,
      stock: 10
    },
    NuevoProducto: {
      $nombre: "Notebook Lenovo",
      $precio: 850000,
      $stock: 10
    },
    ErrorResponse: {
      mensaje: "Descripción del error ocurrido"
    }
  }
};

const outputFile = './swagger-output.json'; // Se creará automáticamente acá en la raíz
const endpointsFiles = ['./src/app.js']; // Apunta a app.js dentro de src/

swaggerAutogen(outputFile, endpointsFiles, doc);
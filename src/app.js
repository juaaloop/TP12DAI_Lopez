const express = require('express');
const swaggerUi = require('swagger-ui-express');

// Requiere el archivo JSON generado en la raíz
const swaggerDocument = require('../swagger-output.json');

const app = express();
app.use(express.json());

// Redirección automática desde la raíz (/) hacia Swagger UI (/api-docs)
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Ruta de la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- ENDPOINTS DE LA API ---

// GET /productos
app.get('/productos', (req, res) => {
  /* 
    #swagger.tags = ['Productos']
    #swagger.summary = 'Obtiene la lista completa de productos'
    #swagger.responses[200] = {
      description: 'Lista de productos obtenida correctamente.',
      schema: [{ $ref: '#/definitions/Producto' }]
    }
  */
  res.status(200).json([
    { id: 1, nombre: 'Notebook Lenovo', precio: 850000, stock: 10 }
  ]);
});

// GET /productos/:id
app.get('/productos/:id', (req, res) => {
  /* 
    #swagger.tags = ['Productos']
    #swagger.summary = 'Obtiene un producto por ID'
    #swagger.parameters['id'] = { description: 'ID del producto a buscar' }
    #swagger.responses[200] = {
      description: 'Producto encontrado.',
      schema: { $ref: '#/definitions/Producto' }
    }
    #swagger.responses[404] = {
      description: 'Producto no encontrado.',
      schema: { $ref: '#/definitions/ErrorResponse' }
    }
  */
  const { id } = req.params;
  if (id === '1') {
    return res.status(200).json({ id: 1, nombre: 'Notebook Lenovo', precio: 850000, stock: 10 });
  }
  res.status(404).json({ mensaje: 'Producto no encontrado' });
});

// POST /productos
app.post('/productos', (req, res) => {
  /* 
    #swagger.tags = ['Productos']
    #swagger.summary = 'Crea un nuevo producto'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos para crear un producto',
      required: true,
      schema: { $ref: '#/definitions/NuevoProducto' }
    }
    #swagger.responses[201] = {
      description: 'Producto creado exitosamente.',
      schema: { $ref: '#/definitions/Producto' }
    }
    #swagger.responses[400] = {
      description: 'Solicitud incorrecta por datos faltantes o inválidos.',
      schema: { $ref: '#/definitions/ErrorResponse' }
    }
  */
  const { nombre, precio, stock } = req.body;
  if (!nombre || !precio) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }
  res.status(201).json({ id: 2, nombre, precio, stock: stock || 0 });
});

// PUT /productos/:id
app.put('/productos/:id', (req, res) => {
  /* 
    #swagger.tags = ['Productos']
    #swagger.summary = 'Modifica un producto existente'
    #swagger.parameters['id'] = { description: 'ID del producto a modificar' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos actualizados del producto',
      required: true,
      schema: { $ref: '#/definitions/NuevoProducto' }
    }
    #swagger.responses[200] = {
      description: 'Producto actualizado exitosamente.',
      schema: { $ref: '#/definitions/Producto' }
    }
    #swagger.responses[404] = {
      description: 'Producto no encontrado para actualizar.',
      schema: { $ref: '#/definitions/ErrorResponse' }
    }
  */
  res.status(200).json({ id: Number(req.params.id), ...req.body });
});

// DELETE /productos/:id
app.delete('/productos/:id', (req, res) => {
  /* 
    #swagger.tags = ['Productos']
    #swagger.summary = 'Elimina un producto por ID'
    #swagger.parameters['id'] = { description: 'ID del producto a eliminar' }
    #swagger.responses[200] = {
      description: 'Producto eliminado exitosamente.'
    }
    #swagger.responses[404] = {
      description: 'Producto no encontrado.',
      schema: { $ref: '#/definitions/ErrorResponse' }
    }
  */
  res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución: http://localhost:${PORT}`);
  console.log(`Swagger UI disponible en: http://localhost:${PORT}/api-docs`);
});
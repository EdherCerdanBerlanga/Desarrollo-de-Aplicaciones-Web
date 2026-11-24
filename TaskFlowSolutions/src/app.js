const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API TaskFlow Solutions funcionando', version: '1.1.0' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/tareas', taskRoutes);

app.use((req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada' }));

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

module.exports = app;

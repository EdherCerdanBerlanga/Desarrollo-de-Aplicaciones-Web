const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TaskFlow Solutions API',
      version: '1.1.0',
      description: 'API REST para registrar, consultar, actualizar y eliminar tareas.'
    },
    servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
    components: {
      schemas: {
        Tarea: {
          type: 'object',
          required: ['titulo', 'usuario_asignado'],
          properties: {
            id: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Desarrollar página web' },
            descripcion: { type: 'string', example: 'Crear la página principal' },
            prioridad: { type: 'string', enum: ['Baja', 'Media', 'Alta'], example: 'Alta' },
            estado: { type: 'string', enum: ['Pendiente', 'En progreso', 'Completada'], example: 'Pendiente' },
            usuario_asignado: { type: 'string', example: 'Carlos' }
          }
        },
        Mensaje: {
          type: 'object',
          properties: { mensaje: { type: 'string' }, id: { type: 'integer' } }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);

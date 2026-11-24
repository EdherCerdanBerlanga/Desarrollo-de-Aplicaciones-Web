require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/database');

describe('API de tareas (pruebas de integración con MySQL)', () => {
  let createdId;
  const uniqueTitle = `Prueba integración ${Date.now()}`;
  const task = {
    titulo: uniqueTitle,
    descripcion: 'Tarea creada durante la prueba',
    prioridad: 'Alta',
    estado: 'Pendiente',
    usuario_asignado: 'UsuarioPrueba'
  };

  beforeAll(async () => {
    await db.query('SELECT 1');
  });

  afterAll(async () => {
    if (createdId) await db.execute('DELETE FROM tareas WHERE id = ?', [createdId]);
    await db.end();
  });

  test('POST /api/tareas crea una tarea en MySQL', async () => {
    const response = await request(app).post('/api/tareas').send(task);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBeDefined();
    createdId = response.body.id;
  });

  test('GET /api/tareas/:id consulta la tarea creada', async () => {
    const response = await request(app).get(`/api/tareas/${createdId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.titulo).toBe(uniqueTitle);
  });

  test('GET /api/tareas permite filtrar por usuario', async () => {
    const response = await request(app).get('/api/tareas').query({ usuario: 'UsuarioPrueba' });
    expect(response.statusCode).toBe(200);
    expect(response.body.tareas.some(item => item.id === createdId)).toBe(true);
  });

  test('PUT /api/tareas/:id actualiza la tarea', async () => {
    const response = await request(app).put(`/api/tareas/${createdId}`).send({
      ...task,
      titulo: `${uniqueTitle} actualizada`,
      estado: 'En progreso'
    });
    expect(response.statusCode).toBe(200);
  });

  test('DELETE /api/tareas/:id elimina la tarea', async () => {
    const response = await request(app).delete(`/api/tareas/${createdId}`);
    expect(response.statusCode).toBe(200);
    createdId = null;
  });

  test('POST rechaza una tarea sin título', async () => {
    const response = await request(app).post('/api/tareas').send({ usuario_asignado: 'Carlos' });
    expect(response.statusCode).toBe(400);
  });
});

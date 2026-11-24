const db = require('../config/database');
const { validateTask } = require('../utils/taskValidation');

async function getTasks(req, res, next) {
  try {
    let sql = 'SELECT * FROM tareas WHERE 1=1';
    const params = [];
    if (req.query.usuario) { sql += ' AND usuario_asignado = ?'; params.push(req.query.usuario); }
    if (req.query.estado) { sql += ' AND estado = ?'; params.push(req.query.estado); }
    if (req.query.prioridad) { sql += ' AND prioridad = ?'; params.push(req.query.prioridad); }
    sql += ' ORDER BY fecha_creacion DESC';
    const [tasks] = await db.execute(sql, params);
    res.json({ total: tasks.length, tareas: tasks });
  } catch (error) { next(error); }
}

async function getTaskById(req, res, next) {
  try {
    const [rows] = await db.execute('SELECT * FROM tareas WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(rows[0]);
  } catch (error) { next(error); }
}

async function createTask(req, res, next) {
  try {
    const errors = validateTask(req.body);
    if (errors.length) return res.status(400).json({ mensaje: errors.join('. ') });

    const { titulo, descripcion = '', prioridad = 'Media', estado = 'Pendiente', usuario_asignado } = req.body;
    const [result] = await db.execute(
      'INSERT INTO tareas (titulo, descripcion, prioridad, estado, usuario_asignado) VALUES (?, ?, ?, ?, ?)',
      [titulo.trim(), descripcion, prioridad, estado, usuario_asignado.trim()]
    );
    res.status(201).json({ mensaje: 'Tarea creada correctamente', id: result.insertId });
  } catch (error) { next(error); }
}

async function updateTask(req, res, next) {
  try {
    const errors = validateTask(req.body);
    if (errors.length) return res.status(400).json({ mensaje: errors.join('. ') });
    const { titulo, descripcion = '', prioridad = 'Media', estado = 'Pendiente', usuario_asignado } = req.body;
    const [result] = await db.execute(
      'UPDATE tareas SET titulo = ?, descripcion = ?, prioridad = ?, estado = ?, usuario_asignado = ? WHERE id = ?',
      [titulo.trim(), descripcion, prioridad, estado, usuario_asignado.trim(), req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea actualizada correctamente' });
  } catch (error) { next(error); }
}

async function deleteTask(req, res, next) {
  try {
    const [result] = await db.execute('DELETE FROM tareas WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) { next(error); }
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };

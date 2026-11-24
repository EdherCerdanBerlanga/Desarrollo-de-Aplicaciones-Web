const allowedPriorities = ['Baja', 'Media', 'Alta'];
const allowedStatuses = ['Pendiente', 'En progreso', 'Completada'];

function validateTask(task, { partial = false } = {}) {
  const errors = [];
  if (!partial || task.titulo !== undefined) {
    if (!task.titulo || typeof task.titulo !== 'string' || !task.titulo.trim()) {
      errors.push('El título es obligatorio');
    }
  }
  if (!partial || task.usuario_asignado !== undefined) {
    if (!task.usuario_asignado || typeof task.usuario_asignado !== 'string' || !task.usuario_asignado.trim()) {
      errors.push('El usuario asignado es obligatorio');
    }
  }
  if (task.prioridad !== undefined && !allowedPriorities.includes(task.prioridad)) {
    errors.push('Prioridad inválida');
  }
  if (task.estado !== undefined && !allowedStatuses.includes(task.estado)) {
    errors.push('Estado inválido');
  }
  if (!partial) {
    if (task.prioridad !== undefined && !allowedPriorities.includes(task.prioridad)) errors.push('Prioridad inválida');
    if (task.estado !== undefined && !allowedStatuses.includes(task.estado)) errors.push('Estado inválido');
  }
  return errors;
}

module.exports = { validateTask, allowedPriorities, allowedStatuses };

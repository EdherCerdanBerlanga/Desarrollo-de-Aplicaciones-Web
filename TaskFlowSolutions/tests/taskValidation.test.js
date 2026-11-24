const { validateTask } = require('../src/utils/taskValidation');

describe('Validación de tareas (pruebas unitarias)', () => {
  test('acepta una tarea con datos válidos', () => {
    const task = { titulo: 'Preparar informe', usuario_asignado: 'Carlos', prioridad: 'Alta', estado: 'Pendiente' };
    expect(validateTask(task)).toEqual([]);
  });

  test('rechaza una tarea sin título', () => {
    const task = { titulo: '', usuario_asignado: 'Carlos', prioridad: 'Media', estado: 'Pendiente' };
    expect(validateTask(task)).toContain('El título es obligatorio');
  });

  test('rechaza una prioridad no permitida', () => {
    const task = { titulo: 'Informe', usuario_asignado: 'Carlos', prioridad: 'Urgente', estado: 'Pendiente' };
    expect(validateTask(task)).toContain('Prioridad inválida');
  });

  test('rechaza un estado no permitido', () => {
    const task = { titulo: 'Informe', usuario_asignado: 'Carlos', prioridad: 'Alta', estado: 'En espera' };
    expect(validateTask(task)).toContain('Estado inválido');
  });
});

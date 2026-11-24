CREATE DATABASE IF NOT EXISTS taskflow_db;
USE taskflow_db;

CREATE TABLE IF NOT EXISTS tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT,
  prioridad ENUM('Baja', 'Media', 'Alta') NOT NULL DEFAULT 'Media',
  estado ENUM('Pendiente', 'En progreso', 'Completada') NOT NULL DEFAULT 'Pendiente',
  usuario_asignado VARCHAR(100) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tareas (titulo, descripcion, prioridad, estado, usuario_asignado)
VALUES
('Preparar informe', 'Elaborar el informe semanal del equipo', 'Media', 'Pendiente', 'Carlos'),
('Diseñar pantalla principal', 'Crear el diseño inicial del sistema', 'Alta', 'En progreso', 'Ana');

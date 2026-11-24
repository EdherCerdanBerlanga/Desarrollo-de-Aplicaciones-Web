# TaskFlow Solutions

API REST básica para gestionar tareas colaborativas mediante Node.js, Express y MySQL.

## Requisitos
- Node.js 18 o superior
- MySQL 8 o compatible
- npm

## Instalación
1. Descomprime el proyecto y abre la carpeta `TaskFlowSolutions` en Visual Studio Code.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea la base de datos ejecutando el archivo `database/taskflow_db.sql` desde MySQL Workbench o la consola de MySQL.
4. Copia `.env.example` y renombra la copia a `.env`.
5. Edita `.env` con los datos de conexión de tu MySQL.
6. Inicia el servidor:
   ```bash
   npm start
   ```
7. Abre `http://localhost:3000` para comprobar que la API funciona.

## Endpoints

| Método | Ruta | Función |
|---|---|---|
| GET | `/api/tareas` | Listar tareas |
| GET | `/api/tareas/1` | Consultar una tarea |
| POST | `/api/tareas` | Crear tarea |
| PUT | `/api/tareas/1` | Actualizar tarea |
| DELETE | `/api/tareas/1` | Eliminar tarea |

### Filtros
- `/api/tareas?usuario=Carlos`
- `/api/tareas?estado=Pendiente`
- `/api/tareas?prioridad=Alta`
- `/api/tareas?usuario=Carlos&estado=Pendiente&prioridad=Alta`

### Ejemplo para crear una tarea
Enviar una solicitud `POST` a `http://localhost:3000/api/tareas` con cuerpo JSON:

```json
{
  "titulo": "Desarrollar página web",
  "descripcion": "Crear la página principal del sistema",
  "prioridad": "Alta",
  "estado": "Pendiente",
  "usuario_asignado": "Carlos"
}
```

Valores permitidos:
- Prioridad: `Baja`, `Media`, `Alta`
- Estado: `Pendiente`, `En progreso`, `Completada`

Para `PUT`, enviar los campos `titulo`, `usuario_asignado`, `prioridad` y `estado`. `descripcion` es opcional.

## Git y GitHub
```bash
git init
git add .
git commit -m "Versión inicial de TaskFlow Solutions"
git branch -M main
git remote add origin https://github.com/USUARIO/TaskFlowSolutions.git
git push -u origin main
```
Reemplaza `USUARIO` por tu usuario de GitHub. No subas el archivo `.env`; ya está excluido mediante `.gitignore`.

## Alcance
Este proyecto implementa CRUD y filtros por usuario, estado y prioridad. La actualización en tiempo real, autenticación y permisos de usuarios no están incluidos en esta versión inicial.

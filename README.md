# Prueba Técnica — Pokédex + Gestor de Tareas

Aplicación web desarrollada con **React 19 + Vite** que integra dos módulos principales: un explorador de Pokémon que consume la **PokéAPI** y un sistema de **gestión de tareas** (CRUD completo) respaldado por **JSON Server**.

---

## Tabla de contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Instalación y uso](#instalación-y-uso)
- [Scripts disponibles](#scripts-disponibles)
- [Rutas de la aplicación](#rutas-de-la-aplicación)

---

## Características

### 🔴 Módulo Pokédex

- Lista los primeros **151 Pokémon** consumiendo la [PokéAPI](https://pokeapi.co/).
- **Búsqueda en tiempo real** por nombre de Pokémon.
- **Paginación** de 10 Pokémon por página.
- **Vista de detalle** individual con estadísticas, tipos (con colores diferenciados por tipo), habilidades y sprites.

### ✅ Módulo Gestor de Tareas

- **CRUD completo**: crear, leer, actualizar y eliminar tareas.
- Backend simulado con **JSON Server** sobre `src/db/tasks.json`.
- Validación de formularios con **Zod** (longitud mínima y máxima por campo).
- Feedback de carga y manejo de errores en cada operación asíncrona.

---

## Tecnologías

| Categoría           | Herramientas                                  |
| ------------------- | --------------------------------------------- |
| Frontend            | React 19, Vite (rolldown-vite)                |
| Estado y peticiones | Redux Toolkit, RTK Query                      |
| Routing             | React Router DOM v7                           |
| Estilos             | Tailwind CSS v4, Bootstrap 5, React-Bootstrap |
| Validación          | Zod                                           |
| HTTP Client         | Axios                                         |
| Mock Backend        | JSON Server                                   |
| Linting             | ESLint 9                                      |

---

## Arquitectura del proyecto

```
src/
├── api/
│   ├── slices.js         # RTK Query — endpoints PokéAPI
│   └── sliceTask.js      # RTK Query — endpoints JSON Server (tareas)
├── components/
│   ├── Products.jsx      # Listado de Pokémon con búsqueda y paginación
│   ├── ProductsCard.jsx  # Tarjeta individual de Pokémon
│   ├── PokemonDetail.jsx # Vista de detalle del Pokémon
│   ├── Tasks.jsx         # Listado y gestión de tareas
│   ├── CrudForm.jsx      # Formulario crear/editar tarea
│   └── SearchBar.jsx     # Barra de búsqueda de Pokémon
├── hooks/
│   ├── useFetch.js       # Hook genérico de fetching
│   ├── useSearch.jsx     # Hook de búsqueda
│   └── useZod.ts         # Hook de validación con Zod
├── store/
│   └── store.js          # Configuración del store de Redux
├── db/
│   └── tasks.json        # Base de datos local para JSON Server
└── App.jsx               # Definición de rutas principales
```

---

## Instalación y uso

### Prerrequisitos

- Node.js >= 18
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/prueba-tecnica.git
cd prueba-tecnica

# 2. Instalar dependencias
npm install

# 3. Iniciar el backend simulado (JSON Server — puerto 5000)
npm run back

# 4. En otra terminal, iniciar el servidor de desarrollo (puerto 5173)
npm run dev
```

> **Importante:** el módulo de tareas requiere que JSON Server esté corriendo en `http://localhost:5000` antes de usar esa sección de la app.

---

## Scripts disponibles

| Script            | Descripción                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo de Vite |
| `npm run build`   | Genera el build de producción            |
| `npm run preview` | Previsualiza el build de producción      |
| `npm run lint`    | Ejecuta ESLint sobre el proyecto         |
| `npm run back`    | Levanta JSON Server en el puerto 5000    |

---

## Rutas de la aplicación

| Ruta           | Componente      | Descripción                                  |
| -------------- | --------------- | -------------------------------------------- |
| `/`            | `Products`      | Listado de Pokémon con búsqueda y paginación |
| `/pokemon/:id` | `PokemonDetail` | Detalle de un Pokémon específico             |
| `/tasks`       | `Tasks`         | Gestor de tareas CRUD                        |

---

## Autor

Desarrollado por **Rodrigo** como prueba técnica de evaluación de habilidades en React.

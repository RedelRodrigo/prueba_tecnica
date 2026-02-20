# Prueba Técnica — Pokédex + Gestor de Tareas

Aplicación web desarrollada con **React 19 + Vite** que integra dos módulos principales: un explorador de Pokémon que consume la **PokéAPI** y un sistema de **gestión de tareas** (CRUD completo) que persiste datos en el **localStorage** del navegador, sin necesidad de backend.

---

## Tabla de contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Instalación y uso](#instalación-y-uso)
- [Scripts disponibles](#scripts-disponibles)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Deploy a producción](#deploy-a-producción)

---

## Características

### 🔴 Módulo Pokédex

- Lista los primeros **151 Pokémon** consumiendo la [PokéAPI](https://pokeapi.co/).
- **Búsqueda en tiempo real** por nombre de Pokémon.
- **Paginación** de 10 Pokémon por página.
- **Vista de detalle** individual con estadísticas, tipos (con colores diferenciados por tipo), habilidades y sprites.

### ✅ Módulo Gestor de Tareas

- **CRUD completo**: crear, leer, actualizar y eliminar tareas.
- Las tareas se persisten en **localStorage**, sin necesidad de backend ni servidor externo.
- Validación de formularios con **Zod** (longitud mínima y máxima por campo).
- Datos disponibles inmediatamente al recargar la página.

---

## Tecnologías

| Categoría           | Herramientas                                  |
| ------------------- | --------------------------------------------- |
| Frontend            | React 19, Vite (rolldown-vite)                |
| Estado y peticiones | Redux Toolkit, RTK Query                      |
| Routing             | React Router DOM v7                           |
| Estilos             | Tailwind CSS v4, Bootstrap 5, React-Bootstrap |
| Validación          | Zod                                           |
| Persistencia        | localStorage (nativo del navegador)           |
| Linting             | ESLint 9                                      |

---

## Arquitectura del proyecto

```
src/
├── api/
│   └── slices.js              # RTK Query — endpoints PokéAPI
├── components/
│   ├── Products.jsx          # Listado de Pokémon con búsqueda y paginación
│   ├── ProductsCard.jsx      # Tarjeta individual de Pokémon
│   ├── PokemonDetail.jsx     # Vista de detalle del Pokémon
│   ├── Tasks.jsx             # Listado y gestión de tareas
│   ├── CrudForm.jsx          # Formulario crear/editar tarea
│   └── SearchBar.jsx         # Barra de búsqueda de Pokémon
├── hooks/
│   ├── useLocalStorageTasks.js # CRUD de tareas con localStorage
│   ├── useFetch.js           # Hook genérico de fetching
│   ├── useSearch.jsx         # Hook de búsqueda
│   └── useZod.ts             # Hook de validación con Zod
├── store/
│   └── store.js              # Store de Redux (solo para PokéAPI)
└── App.jsx                   # Definición de rutas principales
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

# 3. Iniciar el servidor de desarrollo (puerto 5173)
npm run dev
```

> El módulo de tareas funciona directamente sin ningún servidor adicional. Las tareas se guardan en el **localStorage** del navegador.

---

## Scripts disponibles

| Script            | Descripción                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo de Vite |
| `npm run build`   | Genera el build de producción            |
| `npm run preview` | Previsualiza el build de producción      |
| `npm run lint`    | Ejecuta ESLint sobre el proyecto         |

---

## Rutas de la aplicación

| Ruta           | Componente      | Descripción                                  |
| -------------- | --------------- | -------------------------------------------- |
| `/`            | `Products`      | Listado de Pokémon con búsqueda y paginación |
| `/pokemon/:id` | `PokemonDetail` | Detalle de un Pokémon específico             |
| `/tasks`       | `Tasks`         | Gestor de tareas CRUD                        |

---

## Deploy a producción

El frontend está desplegado en **Netlify**. Al no requerir backend, el deploy es un proceso de un solo paso:

1. Conectar el repositorio de GitHub a Netlify.
2. Build command: `npm run build` / Publish directory: `dist`.
3. Listo — el gestor de tareas funciona completamente en el navegador gracias a localStorage.

---

## Autor

Desarrollado por **Rodrigo** como prueba técnica de evaluación de habilidades en React.

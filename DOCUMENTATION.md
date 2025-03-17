# Documentación del Catálogo de Películas

## Descripción General
Este proyecto es una aplicación web para gestionar un catálogo de películas, desarrollada con Angular. Permite visualizar, crear, editar y eliminar información sobre películas, incluyendo título, sinopsis, año y portada.

## Estructura del Proyecto

```
catalogo-peliculas/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── home/               # Componente de página principal
│   │   ├── models/
│   │   │   └── movie.ts            # Interfaz para el modelo de película
│   │   ├── movie/                  # Componente para listar películas
│   │   ├── movie-detail/           # Componente para ver detalles de una película
│   │   ├── services/
│   │   │   ├── api.service.ts      # Servicio base para la API
│   │   │   └── movie.service.ts    # Servicio para operaciones con películas
│   │   ├── app.component.*         # Componente raíz
│   │   ├── app.config.ts           # Configuración de la aplicación
│   │   └── app.routes.ts           # Definición de rutas
│   ├── assets/                     # Recursos estáticos (imágenes, etc.)
│   ├── index.html                  # HTML principal
│   └── main.ts                     # Punto de entrada de la aplicación
└── ...                             # Archivos de configuración
```

## Componentes Principales

### 1. HomeComponent
**Propósito:** Página principal de la aplicación.
**Ubicación:** `src/app/components/home/`
**Descripción:** Muestra la información básica del proyecto y del estudiante, incluyendo el logo y el fondo. Contiene además un footer con información del desarrollador.

### 2. MovieComponent
**Propósito:** Muestra el catálogo completo de películas.
**Ubicación:** `src/app/movie/`
**Descripción:** Gestiona la visualización de todas las películas en formato de tarjetas. Permite la navegación a la vista detallada de cada película y maneja los estados de carga y errores.

### 3. MovieDetailComponent
**Propósito:** Muestra los detalles de una película específica.
**Ubicación:** `src/app/movie-detail/`
**Descripción:** Presenta la información completa de una película seleccionada, incluyendo su título, sinopsis, año de lanzamiento y portada.

## Modelos de Datos

### Movie
**Ubicación:** `src/app/models/movie.ts`
**Propiedades:**
- `id?: number` - Identificador único de la película (opcional en creación)
- `title: string` - Título de la película
- `synopsis: string` - Resumen de la trama
- `year: number` - Año de lanzamiento
- `cover: string` - URL de la imagen de portada
- `created_at?: string` - Fecha de creación del registro (opcional)
- `updated_at?: string` - Fecha de última actualización (opcional)

## Servicios

### MovieService
**Ubicación:** `src/app/services/movie.service.ts`
**Descripción:** Servicio encargado de la comunicación con la API RESTful del backend. Gestiona todas las operaciones CRUD relacionadas con las películas.

**Métodos principales:**
- `getMovies()`: Obtiene todas las películas
- `getMovie(id)`: Obtiene una película específica por ID
- `createMovie(movie)`: Crea una nueva película
- `updateMovie(id, movie)`: Actualiza una película existente
- `deleteMovie(id)`: Elimina una película existente

## Flujo de Datos
1. El usuario accede a la aplicación a través del HomeComponent
2. Navega al catálogo de películas (MovieComponent)
3. MovieComponent solicita datos a MovieService
4. MovieService realiza peticiones HTTP a la API RESTful
5. Los datos recibidos se muestran en las vistas correspondientes
6. El usuario puede seleccionar una película para ver sus detalles en MovieDetailComponent

## API RESTful
La aplicación se comunica con un backend PHP a través de una API RESTful ubicada en: `http://localhost/catalogo/public/api`

**Endpoints:**
- `GET /movies` - Obtiene todas las películas
- `GET /movies/{id}` - Obtiene una película específica
- `POST /movies` - Crea una nueva película
- `PUT /movies/{id}` - Actualiza una película existente
- `DELETE /movies/{id}` - Elimina una película existente

## Información del Desarrollador
- **Nombre:** Pedro Pablo Rodriguez Gomez
- **ID:** 227371502
- **Universidad:** Universidad de Guadalajara
- **Curso:** Conceptualización de entornos de desarrollo de aplicaciones y servicios

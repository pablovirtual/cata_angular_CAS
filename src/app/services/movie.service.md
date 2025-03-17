# MovieService

## Descripción
Servicio para gestionar las operaciones relacionadas con películas. Este servicio es responsable de la comunicación con la API RESTful del backend, realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las películas, manejar errores de comunicación con la API y transformar datos entre el cliente y el servidor.

## Propiedades

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `apiUrl` | `string` (privada) | URL base de la API |
| `httpOptions` | `object` (privada) | Opciones HTTP predeterminadas, incluye headers |

## Métodos

| Método | Parámetros | Retorno | Descripción |
|--------|------------|---------|-------------|
| `getMovies()` | ninguno | `Observable<Movie[]>` | Obtiene todas las películas desde la API |
| `getMovie(id)` | `id: number` | `Observable<Movie>` | Obtiene una película específica por su ID |
| `createMovie(movie)` | `movie: Movie` | `Observable<any>` | Crea una nueva película en la base de datos |
| `updateMovie(id, movie)` | `id: number, movie: Movie` | `Observable<any>` | Actualiza una película existente |
| `deleteMovie(id)` | `id: number` | `Observable<any>` | Elimina una película existente |
| `handleError(error)` | `error: any` | `Observable<Error>` | Maneja errores en las peticiones HTTP (privado) |

## Dependencias Inyectadas

- **HttpClient**: Proporciona métodos para hacer peticiones HTTP 

## Estructura de Datos

El servicio trabaja con el modelo `Movie` definido en `../models/movie.ts`:

```typescript
export interface Movie {
    id?: number;
    title: string;
    synopsis: string;
    year: number;
    cover: string;
    created_at?: string;
    updated_at?: string;
}
```

## Comunicación con la API

Este servicio se comunica con la API RESTful localizada en `http://localhost/catalogo/public/api` y utiliza los siguientes endpoints:

| Endpoint | Método HTTP | Descripción |
|----------|-------------|-------------|
| `/movies` | GET | Obtiene todas las películas |
| `/movies/:id` | GET | Obtiene una película específica |
| `/movies` | POST | Crea una nueva película |
| `/movies/:id` | PUT | Actualiza una película existente |
| `/movies/:id` | DELETE | Elimina una película existente |

## Implementación y Manejo de Datos

- Las respuestas de la API pueden estar envueltas en un objeto con una propiedad `data` o ser directamente los datos requeridos. El servicio maneja ambos casos.
- Utiliza operadores de RxJS como `map`, `tap` y `catchError` para transformar, registrar y manejar errores en las respuestas.
- El método `handleError` diferencia entre errores del lado del cliente y errores del servidor para proporcionar mensajes adecuados.

## Ejemplo de Uso

```typescript
// En un componente:
constructor(private movieService: MovieService) {}

loadMovies(): void {
  this.movieService.getMovies().subscribe({
    next: (movies) => {
      // Procesar las películas
    },
    error: (err) => {
      // Manejar el error
    }
  });
}
```

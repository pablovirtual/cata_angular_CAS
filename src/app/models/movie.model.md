# Movie Model

## Descripción
Interfaz que define la estructura de datos para el objeto Movie (Película) utilizado en toda la aplicación. Este modelo representa la información esencial de una película en el catálogo.

## Estructura

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

## Propiedades

| Propiedad | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `id` | `number` | No | Identificador único de la película. Es opcional en operaciones de creación ya que será asignado por el servidor. |
| `title` | `string` | Sí | Título de la película. |
| `synopsis` | `string` | Sí | Resumen o sinopsis de la trama de la película. |
| `year` | `number` | Sí | Año de lanzamiento de la película. |
| `cover` | `string` | Sí | URL de la imagen de portada de la película. |
| `created_at` | `string` | No | Fecha y hora de creación del registro en la base de datos. Formato ISO. |
| `updated_at` | `string` | No | Fecha y hora de la última actualización del registro. Formato ISO. |

## Uso del Modelo

Este modelo se utiliza en:

1. **MovieComponent**: Para mostrar la lista de películas.
2. **MovieDetailComponent**: Para mostrar los detalles de una película específica.
3. **MovieService**: Para tipificar los datos en las operaciones CRUD con la API.

## Ejemplo de Uso

```typescript
// Creación de una nueva película
const newMovie: Movie = {
  title: 'El Padrino',
  synopsis: 'La historia de la familia Corleone, una de las más poderosas mafias de Nueva York en los años 40.',
  year: 1972,
  cover: 'https://ejemplo.com/imagen-el-padrino.jpg'
};

// Película recibida de la API con todos los campos
const fetchedMovie: Movie = {
  id: 1,
  title: 'El Padrino',
  synopsis: 'La historia de la familia Corleone, una de las más poderosas mafias de Nueva York en los años 40.',
  year: 1972,
  cover: 'https://ejemplo.com/imagen-el-padrino.jpg',
  created_at: '2023-01-15T10:30:45Z',
  updated_at: '2023-02-20T14:15:22Z'
};
```

## Validaciones Recomendadas

Aunque la interfaz TypeScript no aplica validaciones en tiempo de ejecución, se recomienda implementar las siguientes validaciones:

1. **title**: No debe estar vacío
2. **synopsis**: No debe estar vacío
3. **year**: Debe ser un número entre 1888 (primera película de la historia) y el año actual
4. **cover**: Debe ser una URL válida a una imagen

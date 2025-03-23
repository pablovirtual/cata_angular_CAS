# MovieDetailComponent

## Descripción
Componente encargado de mostrar la información detallada de una película específica. Permite al usuario ver todos los detalles de la película seleccionada, así como editar o eliminar la película.

## Propiedades

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `movie` | `Movie` | Almacena los datos de la película seleccionada |
| `error` | `string` | Mensaje de error si ocurre algún problema |
| `loading` | `boolean` | Indica si los datos están siendo cargados |
| `confirmDelete` | `boolean` | Controla la visualización del diálogo de confirmación para eliminar |

## Métodos

| Método | Parámetros | Retorno | Descripción |
|--------|------------|---------|-------------|
| `ngOnInit()` | ninguno | `void` | Método del ciclo de vida que se ejecuta cuando se inicializa el componente |
| `loadMovie()` | ninguno | `void` | Carga los detalles de la película desde el servicio MovieService |
| `editMovie()` | ninguno | `void` | Navega a la vista de edición de la película |
| `showDeleteConfirm()` | ninguno | `void` | Muestra el diálogo de confirmación para eliminar |
| `cancelDelete()` | ninguno | `void` | Oculta el diálogo de confirmación |
| `confirmDeleteMovie()` | ninguno | `void` | Ejecuta la eliminación de la película |
| `goBack()` | ninguno | `void` | Regresa a la vista de catálogo |

## Dependencias Inyectadas

- **MovieService**: Proporciona métodos para interactuar con la API de películas
- **Router**: Facilita la navegación entre componentes
- **ActivatedRoute**: Permite acceder a los parámetros de la ruta

## Otras Dependencias
| Dependencia | Descripción |
|-------------|-------------|
| `NavbarComponent` | Componente de navegación reutilizable que proporciona una barra de navegación consistente |

## Flujo de Datos

1. Cuando el componente se inicializa, se obtiene el ID de la película de los parámetros de ruta
2. Se llama al método `loadMovie()` que utiliza el `movieService` para obtener los detalles de la película
3. Cuando los datos se reciben correctamente:
   - Se asignan a la propiedad `movie`
   - Se establece `loading = false`
4. Si ocurre un error:
   - Se asigna el mensaje de error a la propiedad `error`
   - Se establece `loading = false`
5. Si el usuario decide editar la película, se llama a `editMovie()` que navega a la ruta de edición
6. Si el usuario decide eliminar la película:
   - Primero debe confirmar a través del diálogo que aparece al llamar a `showDeleteConfirm()`
   - Si confirma, se llama a `confirmDeleteMovie()` que ejecuta la eliminación y regresa al catálogo
   - Si cancela, se llama a `cancelDelete()` que oculta el diálogo

## Vista

El template asociado a este componente (`movie-detail.component.html`) debe mostrar:

1. **Barra de navegación** usando el componente `<app-navbar>`
2. Un indicador de carga mientras `loading` es `true`
3. Un mensaje de error si `error` no está vacío
4. Todos los detalles de la película cuando se carga correctamente:
   - Título de la película
   - Año de lanzamiento
   - Imagen de portada
   - Sinopsis completa
5. Botones de acción:
   - Editar película (llama a `editMovie()`)
   - Eliminar película (llama a `showDeleteConfirm()`)
   - Volver al catálogo (llama a `goBack()`)
6. Un diálogo de confirmación para eliminar la película cuando `confirmDelete` es `true`

## Historial de Cambios

- **23/03/2025**: Se implementó el componente de navegación reutilizable (NavbarComponent) para proporcionar una experiencia de navegación consistente en toda la aplicación.

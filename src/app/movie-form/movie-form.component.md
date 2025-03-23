# MovieFormComponent

## Descripción
Componente multiuso para la creación y edición de películas. Ofrece una interfaz de formulario para ingresar o actualizar los datos de una película, con validación de campos y retroalimentación visual para el usuario.

## Propiedades

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `movieForm` | `FormGroup` | Formulario reactivo para gestionar los datos de la película |
| `isEditMode` | `boolean` | Indica si el componente está en modo edición (`true`) o creación (`false`) |
| `movieId` | `number` | ID de la película en caso de estar en modo edición |
| `loading` | `boolean` | Indica si los datos están siendo cargados |
| `submitting` | `boolean` | Indica si el formulario está siendo enviado |
| `error` | `string` | Mensaje de error si ocurre algún problema |
| `successMessage` | `string` | Mensaje de éxito al completar la operación |

## Métodos

| Método | Parámetros | Retorno | Descripción |
|--------|------------|---------|-------------|
| `ngOnInit()` | ninguno | `void` | Inicializa el componente y configura el formulario |
| `initForm()` | ninguno | `void` | Crea el formulario reactivo con las validaciones necesarias |
| `loadMovieData()` | ninguno | `void` | En modo edición, carga los datos de la película existente |
| `onSubmit()` | ninguno | `void` | Procesa el envío del formulario (creación o actualización) |
| `createMovie()` | `movieData: Movie` | `void` | Crea una nueva película con los datos del formulario |
| `updateMovie()` | `movieData: Movie` | `void` | Actualiza una película existente con los datos del formulario |
| `hasError()` | `field: string` | `boolean` | Verifica si un campo específico tiene errores |
| `getErrorMessage()` | `field: string` | `string` | Devuelve el mensaje de error apropiado para un campo |
| `cancel()` | ninguno | `void` | Cancela la operación y regresa al catálogo |

## Dependencias Inyectadas

- **MovieService**: Proporciona métodos para interactuar con la API de películas
- **Router**: Facilita la navegación entre componentes
- **ActivatedRoute**: Permite acceder a los parámetros de la ruta
- **FormBuilder**: Facilita la creación de formularios reactivos

## Otras Dependencias
| Dependencia | Descripción |
|-------------|-------------|
| `NavbarComponent` | Componente de navegación reutilizable que proporciona una barra de navegación consistente |
| `ReactiveFormsModule` | Módulo de Angular para trabajar con formularios reactivos |

## Validaciones del Formulario

El componente implementa las siguientes validaciones para los campos del formulario:

| Campo | Validaciones |
|-------|-------------|
| `title` | Requerido, longitud mínima de 3 caracteres |
| `year` | Requerido, valor numérico, mínimo 1900, máximo año actual |
| `synopsis` | Requerido, longitud mínima de 20 caracteres |
| `cover` | Requerido, debe ser una URL válida |

## Flujo de Datos

1. **Inicialización**:
   - El componente detecta si está en modo edición o creación según los parámetros de ruta
   - Inicializa el formulario con `initForm()`
   - En modo edición, carga los datos de la película con `loadMovieData()`

2. **Entrada de datos**:
   - El usuario completa el formulario con los datos de la película
   - Las validaciones se aplican en tiempo real
   - El botón de envío se habilita solo cuando el formulario es válido

3. **Envío del formulario**:
   - Al enviar, se establece `submitting = true`
   - Según el modo, se llama a `createMovie()` o `updateMovie()`
   - Se muestra un indicador de carga durante el proceso

4. **Finalización**:
   - En caso de éxito, se muestra un mensaje y se redirige al catálogo
   - En caso de error, se muestra el mensaje de error y se permite corregir

## Vista

El template asociado a este componente (`movie-form.component.html`) muestra:

1. **Barra de navegación** usando el componente `<app-navbar>`
2. Título dinámico (Agregar/Editar Película) según el modo
3. Formulario con campos para:
   - Título de la película
   - Año de lanzamiento
   - URL de la imagen de portada
   - Sinopsis
4. Validación visual para cada campo (indicadores de error)
5. Mensajes de error específicos para cada tipo de validación
6. Botones de acción:
   - Guardar/Crear (habilitado solo si el formulario es válido)
   - Cancelar (regresa al catálogo)
7. Indicadores de carga durante el envío del formulario
8. Mensaje de éxito/error después del envío

## Historial de Cambios

- **23/03/2025**: 
  - Se implementó el componente de navegación reutilizable (NavbarComponent)
  - Se mejoró la validación del formulario con ReactiveFormsModule
  - Se añadieron indicadores visuales de carga y mensajes de retroalimentación
  - Se corrigió el método createMovie para utilizar correctamente el servicio

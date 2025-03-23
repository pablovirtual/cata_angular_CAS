# MovieComponent

## Descripción
Componente principal para mostrar el catálogo completo de películas. Gestiona la visualización de todas las películas en formato de tarjetas, permite la navegación a la vista detallada de cada película y maneja los estados de carga y errores.

## Propiedades

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `movies` | `Movie[]` | Almacena la lista de películas obtenidas del servicio |
| `error` | `string` | Mensaje de error si ocurre algún problema |
| `loading` | `boolean` | Indica si los datos están siendo cargados |

## Métodos

| Método | Parámetros | Retorno | Descripción |
|--------|------------|---------|-------------|
| `ngOnInit()` | ninguno | `void` | Método del ciclo de vida que se ejecuta cuando se inicializa el componente |
| `loadMovies()` | ninguno | `void` | Carga la lista de películas desde el servicio MovieService |
| `navigateToDetail(movieId)` | `movieId: number` | `void` | Navega a la vista detallada de una película específica |

## Dependencias Inyectadas

- **MovieService**: Proporciona métodos para interactuar con la API de películas
- **Router**: Facilita la navegación entre componentes

## Otras Dependencias
| Dependencia | Descripción |
|-------------|-------------|
| `NavbarComponent` | Componente de navegación reutilizable que proporciona una barra de navegación consistente |

## Implementación

```typescript
export class MovieComponent implements OnInit {
  /** Almacena la lista de películas obtenidas del servicio */
  movies: Movie[] = [];
  
  /** Mensaje de error si ocurre algún problema */
  error: string = '';
  
  /** Indica si los datos están siendo cargados */
  loading: boolean = true;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading movies: ' + err.message;
        this.loading = false;
      }
    });
  }

  navigateToDetail(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }
}
```

## Flujo de Datos

1. Cuando el componente se inicializa, se llama al método `loadMovies()`
2. `loadMovies()` establece `loading = true` y llama al servicio `movieService.getMovies()`
3. Cuando los datos se reciben correctamente:
   - Se asignan a la propiedad `movies`
   - Se establece `loading = false`
4. Si ocurre un error:
   - Se asigna el mensaje de error a la propiedad `error`
   - Se establece `loading = false`
5. Cuando el usuario selecciona una película, se llama a `navigateToDetail(movieId)`
6. `navigateToDetail(movieId)` utiliza el Router para navegar a la ruta `/movies/:id`

## Vista

El template asociado a este componente (`movie.component.html`) debe mostrar:

1. **Barra de navegación** usando el componente `<app-navbar>`
2. Un indicador de carga mientras `loading` es `true`
3. Un mensaje de error si `error` no está vacío
4. Una lista de tarjetas para cada película en `movies`
5. Cada tarjeta debe tener un evento de clic para llamar a `navigateToDetail(movie.id)`

## Historial de Cambios

- **23/03/2025**: Se implementó el componente de navegación reutilizable (NavbarComponent) para proporcionar una experiencia de navegación consistente en toda la aplicación.

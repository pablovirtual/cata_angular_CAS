# NavbarComponent

## Descripción
El componente `NavbarComponent` es un componente de navegación reutilizable que proporciona una interfaz de navegación consistente a través de toda la aplicación. Permite a los usuarios navegar entre las diferentes secciones de la aplicación de manera intuitiva.

## Características
- **Reusabilidad**: Componente diseñado para ser incluido en múltiples partes de la aplicación.
- **Navegación Universal**: Proporciona acceso a todas las rutas principales de la aplicación.
- **Diseño Responsivo**: Se adapta a diferentes tamaños de pantalla gracias a Bootstrap.
- **Identidad Visual**: Incluye el logo de la aplicación para reforzar la identidad de marca.

## Implementación
El componente está estructurado en tres archivos principales:
- `navbar.component.ts`: Lógica del componente
- `navbar.component.html`: Estructura HTML del componente
- `navbar.component.css`: Estilos específicos del componente

### HTML (navbar.component.html)
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" [routerLink]="['/']">
      <img src="assets/images/logo.jpg" alt="Logo" height="30" class="d-inline-block align-text-top me-2">
      Catálogo de Películas
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/movies']">Ver Catálogo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/movies/new']">Agregar Película</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

### TypeScript (navbar.component.ts)
```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // No se requiere lógica adicional para este componente
}
```

## Uso
Para utilizar este componente en cualquier otro componente, sigue estos pasos:

1. **Importar el componente**:
```typescript
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  // ...
  imports: [NavbarComponent, /* otros imports */],
  // ...
})
export class OtroComponente { /* ... */ }
```

2. **Incluir en el template**:
```html
<app-navbar></app-navbar>
<!-- Resto del contenido del componente -->
```

## Enlaces de Navegación
El NavbarComponent proporciona los siguientes enlaces:
- **Página Principal**: Navega a la ruta raíz (`/`).
- **Ver Catálogo**: Navega a la lista de películas (`/movies`).
- **Agregar Película**: Navega al formulario de creación de películas (`/movies/new`).

## Historial de Cambios
- **23/03/2025**: Creación inicial del componente.

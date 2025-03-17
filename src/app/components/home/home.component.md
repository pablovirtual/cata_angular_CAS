# HomeComponent

## Descripción
Componente que representa la página principal de la aplicación de Catálogo de Películas. Muestra información básica del proyecto y del estudiante, incluyendo elementos visuales como logo y fondo.

## Propiedades

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `currentYear` | `number` | Año actual para el texto de copyright |
| `logoImagePath` | `string` | Ruta a la imagen del logo |
| `backgroundImagePath` | `string` | Ruta a la imagen de fondo |
| `studentInfo` | `object` | Información del estudiante para el footer |

## Estructura de studentInfo

```typescript
{
    name: string;       // Nombre del estudiante
    id: string;         // Código del estudiante
    university: string; // Universidad
    course: string;     // Nombre del curso
}
```

## Implementación Actual

```typescript
export class HomeComponent {
    // año actual para copyrigth
    currentYear = new Date().getFullYear();

    // Rutas de imágenes
    logoImagePath = 'assets/images/logo.jpg';
    backgroundImagePath = 'assets/images/fondo.jpg';

    //Datos del estudiante para el footer
    studentInfo = {
        name: 'Pedro Pablo Rodriguez Gomez',
        id: '227371502',
        university: 'Universidad de Guadalajara',
        course: 'Conceptualizacion de entornos de desarrollo de aplicaciones y servicios'
    };
}
```

## Utilización

Este componente se utiliza como página de inicio de la aplicación y proporciona navegación al catálogo principal de películas.

## Template

El template asociado a este componente (`home.component.html`) debe incluir:

1. Sección de encabezado con logo
2. Área principal con imagen de fondo
3. Footer con la información del estudiante y año de copyright

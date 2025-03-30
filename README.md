# CatalogoPeliculas

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Documentación del Proyecto

Este proyecto incluye documentación detallada para facilitar su comprensión y mantenimiento:

- [`DOCUMENTATION.md`](./DOCUMENTATION.md): Documentación general del proyecto, estructura y funcionamiento.
- [`src/app/components/home/home.component.md`](./src/app/components/home/home.component.md): Documentación del componente Home.
- [`src/app/movie/movie.component.md`](./src/app/movie/movie.component.md): Documentación del componente Movie.
- [`src/app/services/movie.service.md`](./src/app/services/movie.service.md): Documentación del servicio MovieService.
- [`src/app/models/movie.model.md`](./src/app/models/movie.model.md): Documentación del modelo de datos Movie.
- [`src/app/shared/navbar/navbar.component.md`](./src/app/shared/navbar/navbar.component.md): Documentación del componente de navegación.

La documentación incluye descripciones detalladas de componentes, servicios, modelos de datos, flujos de trabajo y ejemplos de uso.

## Registro de Cambios

### 23 de Marzo de 2025
- **Implementación de Barra de Navegación**: Se creó un componente NavbarComponent reutilizable para proporcionar una experiencia de navegación consistente en toda la aplicación.
- **Mejoras en UI/UX**: Se actualizaron todos los componentes principales (Home, Movie, MovieDetail, MovieForm) para usar el nuevo componente de navegación.
- **Reestructuración**: Se reorganizó la estructura visual de las páginas para mantener un diseño coherente entre componentes.
- **Mejoras en el Formulario**: Se mejoró el formulario de creación/edición de películas con validación reactiva más robusta y mejor feedback visual.
- **Corrección de errores**: Se solucionaron problemas con la navegación y el manejo de errores en varios componentes.

## Despliegue de la Aplicación

### Requisitos Previos

Para desplegar la aplicación necesitarás:

- Cuenta en [Railway](https://railway.app/)
- [Node.js](https://nodejs.org/) (v18 o superior)
- [Angular CLI](https://angular.io/cli) (v19.2.0)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (opcional, para pruebas locales del contenedor)

### Preparación para el Despliegue

1. **Construir la Aplicación para Producción**

   ```bash
   npm run build
   ```

   Este comando generará la aplicación optimizada en la carpeta `dist/catalogo-peliculas/browser`.

2. **Verificación de Archivos Estáticos**

   Asegúrate de que todos los archivos estáticos necesarios (imágenes, fuentes, etc.) estén correctamente incluidos en la carpeta `assets`:

   ```bash
   # Estructura correcta de assets
   dist/catalogo-peliculas/browser/assets/
   ├── images/
   │   ├── logo.jpg
   │   ├── fondo.jpg
   │   └── ...
   └── ...
   ```

3. **Archivo `start.sh`**

   Crea un archivo `start.sh` en la raíz de tu proyecto:

   ```bash
   #!/bin/sh
   # Reemplazar la variable de entorno PORT en la configuración de nginx
   envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
   # Iniciar nginx
   nginx -g 'daemon off;'
   ```

4. **Configuración de Nginx (opcional)**

   Si necesitas personalizar la configuración de Nginx, crea un archivo `default.conf.template`:

   ```nginx
   server {
       listen ${PORT};
       
       location / {
           root /usr/share/nginx/html;
           index index.html index.htm;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

### Archivo Dockerfile

El proyecto incluye un `Dockerfile` para containerizar la aplicación:

```dockerfile
# Etapa de producción
FROM nginx:alpine

# Copiar el script de inicio
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Copiar la aplicación compilada previamente
COPY dist/catalogo-peliculas/browser /usr/share/nginx/html

# Exponer puerto (esto es informativo, el puerto real lo determina Railway)
EXPOSE 8080

# Ejecutar el script de inicio
CMD ["/start.sh"]
```

### Despliegue en Railway

1. **Inicializar Repositorio Git** (si no lo has hecho ya)

   ```bash
   git init
   git add .
   git commit -m "Preparación para despliegue en Railway"
   ```

2. **Crear un Nuevo Proyecto en Railway**

   - Accede a [Railway](https://railway.app/) y crea una cuenta o inicia sesión
   - Crea un nuevo proyecto seleccionando "Deploy from GitHub repo"
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio que contiene tu aplicación

3. **Configuración del Despliegue**

   - Railway detectará automáticamente el `Dockerfile`
   - Asegúrate de que la variable de entorno `PORT` esté configurada (Railway la establece por defecto)
   - Opcional: Configura un dominio personalizado en la sección "Settings"

4. **Verificar el Despliegue**

   - Railway desplegará automáticamente tu aplicación
   - Puedes ver los logs del despliegue en la sección "Deployments"
   - Una vez completado, haz clic en la URL generada para acceder a tu aplicación

### Solución de Problemas Comunes

1. **Problema**: Imágenes no se muestran en producción
   **Solución**: Asegúrate de que las imágenes estén en la carpeta `src/assets/images` y que las rutas en el código estén correctas (usando `assets/images/nombre-archivo.jpg`).

2. **Problema**: El menú responsive no funciona
   **Solución**: Verifica la implementación del componente `NavbarComponent` y asegúrate de que esté utilizando las clases CSS correctas. Consulta la sección de CSS personalizado en `navbar.component.css`.

3. **Problema**: Error 404 al navegar directamente a una ruta
   **Solución**: Asegúrate de que la configuración de Nginx incluya la redirección para SPA: `try_files $uri $uri/ /index.html;`.

4. **Problema**: Fallos al compilar en Railway
   **Solución**: Verifica los logs de despliegue y asegúrate de que todos los comandos en el `Dockerfile` se ejecuten correctamente. Puede ser necesario ajustar permisos o dependencias.

### Actualizaciones y Mantenimiento

Para actualizar la aplicación desplegada:

1. Realiza cambios en tu código
2. Compila la aplicación: `npm run build`
3. Haz commit de los cambios: `git add . && git commit -m "Descripción de cambios"`
4. Sube los cambios: `git push`
5. Railway detectará automáticamente los cambios y desplegará la nueva versión

## API Backend en Railway

La aplicación Angular se comunica con una API backend desarrollada en Laravel y desplegada en Railway. Esta API gestiona el acceso a la base de datos MySQL y proporciona los endpoints necesarios para realizar operaciones CRUD sobre las películas.

### Información de Despliegue

- **URL de la API**: `https://cataangularcas-production.up.railway.app/api`
- **Repositorio**: `catalago_laravel` (GitHub integrado con Railway)
- **Base de Datos**: MySQL (Desplegada en Railway)
  - Conexión: `mysql://root:Ufax1824@yamanote.proxy.rlwy.net:47960/catalogo`
  - **Nota**: Esta conexión solo debe ser utilizada por el backend Laravel, nunca directamente desde Angular.

### Endpoints Disponibles

La API expone los siguientes endpoints RESTful:

#### Películas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/movies` | Obtener todas las películas |
| GET | `/api/movies/{id}` | Obtener una película específica por su ID |
| POST | `/api/movies` | Crear una nueva película |
| PUT | `/api/movies/{id}` | Actualizar una película existente |
| DELETE | `/api/movies/{id}` | Eliminar una película |

### Formato de Datos

#### Película (Movie)

```json
{
  "id": 1,
  "title": "El Padrino",
  "director": "Francis Ford Coppola",
  "year": 1972,
  "cover": "https://example.com/cover.jpg",
  "poster": "https://example.com/poster.jpg",
  "genre": "Drama",
  "synopsis": "La historia de la familia mafiosa Corleone..."
}
```

### Integración en Angular

El servicio `MovieService` en Angular está configurado para comunicarse con la API Laravel. Incluye manejo de errores y utiliza datos de demostración como respaldo en caso de que la API no esté disponible.

```typescript
// Ejemplo de configuración en movie.service.ts
private apiUrl = 'https://cataangularcas-production.up.railway.app/api';

private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};
```

### Consideraciones de Seguridad

- Las credenciales de base de datos nunca deben estar en el código del frontend.
- La comunicación debe seguir el flujo: Angular → API Laravel → MySQL.
- Para operaciones de escritura (POST, PUT, DELETE), se recomienda implementar autenticación en la API.

### Mantenimiento y Monitoreo

Para verificar el estado de la API:
1. Accede al dashboard de Railway: [railway.app](https://railway.app/)
2. Selecciona el proyecto "cata_angular_CAS"
3. Revisa los logs y métricas del servicio "catalago_laravel"

## Información del Desarrollador

- **Nombre:** Pedro Pablo Rodriguez Gomez
- **ID:** 227371502
- **Universidad:** Universidad de Guadalajara
- **Curso:** Conceptualización de entornos de desarrollo de aplicaciones y servicios

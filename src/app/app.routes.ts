import { Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomeComponent } from './components/home/home.component';
import { MovieFormComponent } from './movie-form/movie-form.component';

/**
 * Configuración de rutas de la aplicación
 * 
 * MODIFICACIONES (23/03/2025):
 * - Se agregó la ruta '/movies/:id' para visualizar los detalles de una película.
 * - Se verificó el orden de las rutas para asegurar que las más específicas
 *   ('/movies/new' y '/movies/edit/:id') estén antes de la paramétrica ('/movies/:id').
 * 
 * NOTA: El orden de las rutas es importante para el correcto funcionamiento de la navegación.
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'movies/new', component: MovieFormComponent },
  { path: 'movies/edit/:id', component: MovieFormComponent },
  { path: 'movies/:id', component: MovieDetailComponent }, // Ruta agregada para ver detalles
  { path: '**', redirectTo: '/' }
];

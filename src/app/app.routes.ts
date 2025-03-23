import { Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomeComponent } from './components/home/home.component';
import { MovieFormComponent } from './movie-form/movie-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'movies/new', component: MovieFormComponent },
  { path: 'movies/edit/:id', component: MovieFormComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '/' }
];

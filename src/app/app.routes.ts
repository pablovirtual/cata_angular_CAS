import { Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '/' }
];

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  movie: Movie = {
    title: '',
    synopsis: '',
    year: new Date().getFullYear(),
    cover: ''
  };
  
  loading = false;
  error = '';
  isEditMode = false;
  movieId: number | null = null;
  
  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    // Detectar si estamos en modo edición
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.movieId = +id;
        this.loadMovie(this.movieId);
      }
    });
  }
  
  loadMovie(id: number): void {
    this.loading = true;
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la película: ' + err.message;
        this.loading = false;
      }
    });
  }
  
  saveMovie(): void {
    this.loading = true;
    this.error = '';
    
    if (this.isEditMode && this.movieId) {
      // Actualizar película existente
      this.movieService.updateMovie(this.movieId, this.movie).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error al actualizar la película: ' + err.message;
        }
      });
    } else {
      // Crear nueva película
      this.movieService.createMovie(this.movie).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error al guardar la película: ' + err.message;
        }
      });
    }
  }
}
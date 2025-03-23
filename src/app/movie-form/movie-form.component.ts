import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  
  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
  }
  
  saveMovie(): void {
    this.loading = true;
    this.error = '';
    
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

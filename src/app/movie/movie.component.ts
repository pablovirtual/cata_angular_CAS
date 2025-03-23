import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { NavbarComponent } from '../shared/navbar/navbar.component';

/**
 * @description Componente principal para mostrar el catálogo de películas
 * 
 * Este componente es responsable de:
 * - Obtener la lista completa de películas desde el servicio MovieService
 * - Mostrar las películas en formato de tarjetas
 * - Permitir la navegación a la vista detallada de cada película
 * - Mostrar estados de carga y mensajes de error cuando sea necesario
 * 
 * MODIFICACIONES (23/03/2025):
 * - Se importó el componente NavbarComponent para incluir la barra de navegación
 * - Se actualizó el diseño para incluir botones de navegación consistentes
 * 
 * @usageNotes
 * Este componente se activa cuando el usuario navega a la ruta '/movies'
 */
@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  /** Almacena la lista de películas obtenidas del servicio */
  movies: Movie[] = [];
  
  /** Indica si los datos están siendo cargados */
  loading: boolean = true;
  
  /** Mensaje de error si ocurre algún problema */
  error: string | null = null;

  /**
   * Constructor del componente
   * @param movieService Servicio para obtener datos de películas
   * @param router Servicio para la navegación entre componentes
   */
  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta cuando se inicializa el componente
   * Llama al método loadMovies para cargar la lista de películas
   */
  ngOnInit(): void {
    this.loadMovies();
  }

  /**
   * Carga la lista de películas desde el servicio MovieService
   * Maneja errores y estados de carga
   */
  loadMovies(): void {
    console.log('Loading movies...');
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
        console.log('Movies loaded successfully:', data);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.error = 'Error cargando películas. Por favor, intenta de nuevo más tarde.';
        this.loading = false;
      }
    });
  }

  /**
   * Navega a la vista detallada de una película específica
   * @param movieId ID de la película seleccionada
   */
  navigateToDetail(movieId: number): void {
    console.log('Navigating to movie details with ID:', movieId);
    this.router.navigate(['/movies', movieId]);
  }
}

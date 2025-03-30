import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { NavbarComponent } from '../shared/navbar/navbar.component';

/**
 * @description Componente para crear o editar películas
 * 
 * Este componente es responsable de:
 * - Proporcionar un formulario para la creación/edición de películas
 * - Validar los datos ingresados por el usuario
 * - Enviar los datos al servicio para su procesamiento
 * - Manejar los mensajes de éxito y error
 * 
 * MODIFICACIONES (23/03/2025):
 * - Se mejoró el manejo de estados (loading, submitting) durante operaciones
 * - Se agregó una validación más completa para el formulario
 * - Se implementaron mensajes de error más descriptivos
 * - Se importó NavbarComponent para incluir la barra de navegación común
 * 
 * @usageNotes
 * Este componente se activa cuando el usuario navega a las rutas:
 * - '/movies/new' para crear una nueva película
 * - '/movies/edit/:id' para editar una película existente
 */
@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, NavbarComponent],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  /** Formulario reactivo para los datos de la película */
  movieForm: FormGroup;
  
  /** ID de la película en caso de edición */
  movieId: number | null = null;
  
  /** Indica si estamos en modo edición */
  isEditMode: boolean = false;
  
  /** Indica si los datos están siendo cargados */
  loading: boolean = false;
  
  /** Indica si el formulario está siendo enviado */
  submitting: boolean = false;
  
  /** Mensaje de error si ocurre algún problema */
  error: string | null = null;
  
  /** Mensaje de éxito tras completar la operación */
  successMessage: string | null = null;

  /**
   * Constructor del componente
   * @param fb Servicio para la construcción de formularios reactivos
   * @param route Servicio para acceder a los parámetros de la ruta
   * @param router Servicio para la navegación entre componentes
   * @param movieService Servicio para gestionar datos de películas
   */
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {
    // Inicializar el formulario con validaciones
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      year: ['', [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear() + 5)]],
      synopsis: ['', [Validators.required, Validators.minLength(10)]],
      cover: ['', [Validators.required]]
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta cuando se inicializa el componente
   * Determina si estamos en modo edición y carga los datos si es necesario
   */
  ngOnInit(): void {
    // Determinar si estamos en modo edición basado en la URL
    const urlPath = this.router.url;
    this.isEditMode = urlPath.includes('/edit/');
    
    if (this.isEditMode) {
      // Obtener el ID de la película desde la URL
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.movieId = +id;
        this.loadMovieData(this.movieId);
      }
    }
  }

  /**
   * Carga los datos de la película para modo edición
   * @param id ID de la película a editar
   */
  loadMovieData(id: number): void {
    this.loading = true;
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        if (movie) {
          // Llenar el formulario con los datos de la película
          this.movieForm.patchValue({
            title: movie.title,
            year: movie.year,
            synopsis: movie.synopsis,
            cover: movie.cover
          });
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading movie for edit:', err);
        this.error = 'Error cargando datos de la película: ' + err.message;
        this.loading = false;
      }
    });
  }

  /**
   * Maneja el envío del formulario
   * Determina si debe crear o actualizar la película según el modo
   */
  onSubmit(): void {
    // Validar el formulario antes de procesar
    if (this.movieForm.invalid) {
      // Marcar todos los campos como tocados para mostrar validaciones
      Object.keys(this.movieForm.controls).forEach(key => {
        const control = this.movieForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    this.error = null;
    this.successMessage = null;

    // Preparar objeto película desde formulario
    const movieData: Movie = {
      id: this.movieId || 0,
      title: this.movieForm.value.title,
      year: this.movieForm.value.year,
      synopsis: this.movieForm.value.synopsis,
      cover: this.movieForm.value.cover
    };

    // Crear o actualizar según el modo
    if (this.isEditMode && this.movieId) {
      this.updateMovie(movieData);
    } else {
      this.createMovie(movieData);
    }
  }

  /**
   * Crea una nueva película
   * @param movieData Datos de la película a crear
   */
  createMovie(movieData: Movie): void {
    this.movieService.createMovie(movieData).subscribe({
      next: (response: any) => {
        console.log('Movie created successfully:', response);
        this.submitting = false;
        this.successMessage = '¡Película creada correctamente!';
        // Limpiar formulario después de crear
        this.movieForm.reset();
        // Redirigir al catálogo después de un breve retraso
        setTimeout(() => this.router.navigate(['/movies']), 2000);
      },
      error: (err: any) => {
        console.error('Error creating movie:', err);
        this.error = 'Error al crear la película: ' + err.message;
        this.submitting = false;
      }
    });
  }

  /**
   * Actualiza una película existente
   * @param movieData Datos actualizados de la película
   */
  updateMovie(movieData: Movie): void {
    // Asignar el ID de la película al objeto movieData
    movieData.id = this.movieId!;
    this.movieService.updateMovie(movieData).subscribe({
      next: (response: any) => {
        console.log('Movie updated successfully:', response);
        this.submitting = false;
        this.successMessage = '¡Película actualizada correctamente!';
        // Redirigir al detalle de la película después de un breve retraso
        setTimeout(() => this.router.navigate(['/movies', this.movieId]), 2000);
      },
      error: (err: any) => {
        console.error('Error updating movie:', err);
        this.error = 'Error al actualizar la película: ' + err.message;
        this.submitting = false;
      }
    });
  }

  /**
   * Determina si un campo del formulario tiene errores de validación
   * @param controlName Nombre del control a verificar
   * @returns Verdadero si el control tiene errores y ha sido tocado
   */
  hasError(controlName: string): boolean {
    const control = this.movieForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  /**
   * Obtiene el mensaje de error para un campo específico
   * @param controlName Nombre del control a verificar
   * @returns Mensaje de error o cadena vacía
   */
  getErrorMessage(controlName: string): string {
    const control = this.movieForm.get(controlName);
    
    if (!control || !control.errors) return '';
    
    const errors = control.errors;
    
    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['min']) return `El valor mínimo es ${errors['min'].min}`;
    if (errors['max']) return `El valor máximo es ${errors['max'].max}`;
    
    return 'Campo inválido';
  }

  /**
   * Cancela la operación actual y regresa al catálogo
   */
  cancel(): void {
    if (this.isEditMode && this.movieId) {
      // Si estamos en modo edición, volver a la vista detallada
      this.router.navigate(['/movies', this.movieId]);
    } else {
      // Si estamos creando, volver al catálogo
      this.router.navigate(['/movies']);
    }
  }
}
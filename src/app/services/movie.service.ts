import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Movie } from '../models/movie';

/**
 * @description Servicio para gestionar las operaciones relacionadas con películas
 * 
 * Este servicio es responsable de:
 * - Comunicarse con la API RESTful del backend
 * - Realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las películas
 * - Manejar errores de comunicación con la API
 * - Transformar datos entre el cliente y el servidor
 */
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  /** 
   * URL base de la API 
   * NOTA: Por ahora, utilizamos datos mockeados para la demostración
   */
  private apiUrl = 'http://api-placeholder/api';
  
  // Datos de demostración para despliegue estático
  private demoMovies: Movie[] = [
    { id: 1, title: 'El Padrino', director: 'Francis Ford Coppola', year: 1972, poster: 'https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg', genre: 'Drama', synopsis: 'La historia de la familia mafiosa Corleone.' },
    { id: 2, title: 'Pulp Fiction', director: 'Quentin Tarantino', year: 1994, poster: 'https://image.tmdb.org/t/p/w500/suaEOtk1N1sgg2QM528BOlti6xW.jpg', genre: 'Crimen', synopsis: 'Las vidas de dos mafiosos, un boxeador, la esposa de un gángster y un par de bandidos se entrelazan.' },
    { id: 3, title: 'Interestelar', director: 'Christopher Nolan', year: 2014, poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', genre: 'Ciencia ficción', synopsis: 'Un grupo de exploradores viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.' }
  ];
  
  /** Opciones HTTP predeterminadas */
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * Constructor del servicio
   * @param http Cliente HTTP para realizar peticiones a la API
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las películas (versión demo estática)
   * @returns Observable con un array de objetos Movie
   */
  getMovies(): Observable<Movie[]> {
    console.log('Usando datos de demostración estáticos (sin backend)');
    return of(this.demoMovies);
  }

  /**
   * Obtiene una película específica por su ID (versión demo estática)
   * @param id ID de la película a obtener
   * @returns Observable con el objeto Movie correspondiente al ID
   */
  getMovie(id: number): Observable<Movie> {
    console.log('Obteniendo película con ID:', id, '(datos de demostración)');
    const movie = this.demoMovies.find(m => m.id === id);
    
    if (movie) {
      return of(movie);
    } else {
      return throwError(() => new Error('Película no encontrada'));
    }
  }

  /**
   * Crea una nueva película (versión demo estática)
   * @param movie Objeto Movie con los datos de la nueva película
   * @returns Observable con la respuesta simulada
   */
  createMovie(movie: Movie): Observable<any> {
    console.log('Creando película de demostración (sin backend):', movie);
    return of({ success: true, message: 'Película creada con éxito (simulado)' });
  }

  /**
   * Actualiza una película existente (versión demo estática)
   * @param id ID de la película a actualizar
   * @param movie Objeto Movie con los nuevos datos
   * @returns Observable con la respuesta simulada
   */
  updateMovie(id: number, movie: Movie): Observable<any> {
    console.log('Actualizando película de demostración (sin backend):', movie);
    return of({ success: true, message: 'Película actualizada con éxito (simulado)' });
  }

  /**
   * Elimina una película existente (versión demo estática)
   * @param id ID de la película a eliminar
   * @returns Observable con la respuesta simulada
   */
  deleteMovie(id: number): Observable<any> {
    console.log('Eliminando película de demostración (sin backend) ID:', id);
    return of({ success: true, message: 'Película eliminada con éxito (simulado)' });
  }

  /**
   * Maneja errores en las peticiones HTTP
   * @param error Objeto de error HTTP
   * @returns Observable que emite un Error
   * @private
   */
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error('API Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
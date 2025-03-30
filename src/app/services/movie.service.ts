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
   * URL base de la API Laravel desplegada en Railway
   */
  private apiUrl = 'https://catalagolaravel-production.up.railway.app/api';
  
  // Configuración para las peticiones HTTP
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  
  // Datos de demostración como respaldo en caso de que la API no esté disponible
  private demoMovies: Movie[] = [
    { 
      id: 1, 
      title: 'El Padrino', 
      director: 'Francis Ford Coppola',
      year: 1972, 
      cover: 'https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg', 
      poster: 'https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg',
      genre: 'Drama',
      synopsis: 'La historia de la familia mafiosa Corleone dirigida por Francis Ford Coppola.' 
    },
    { 
      id: 2, 
      title: 'El Caballero de la Noche', 
      director: 'Christopher Nolan',
      year: 2008, 
      cover: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      genre: 'Acción',
      synopsis: 'Batman se enfrenta al Joker, un criminal que busca sumir a Ciudad Gótica en el caos.' 
    },
    { 
      id: 3, 
      title: 'Pulp Fiction', 
      director: 'Quentin Tarantino',
      year: 1994, 
      cover: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 
      poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      genre: 'Crimen',
      synopsis: 'Las vidas de varios criminales de Los Ángeles se entrelazan en esta historia no lineal.' 
    }
  ];
  
  constructor(private http: HttpClient) { }
  
  /**
   * Obtiene todas las películas desde la API
   * @returns Observable con array de películas
   */
  getMovies(): Observable<Movie[]> {
    // Obtener películas desde la API
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`, this.httpOptions).pipe(
      tap(movies => console.log('Películas obtenidas desde API')),
      catchError(err => {
        console.error('Error al obtener películas desde API', err);
        // Usar datos de demostración como respaldo
        console.log('Usando datos de demostración como respaldo');
        return of(this.demoMovies);
      })
    );
  }
  
  /**
   * Obtiene una película por su ID
   * @param id ID de la película
   * @returns Observable con la película
   */
  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`, this.httpOptions).pipe(
      tap(movie => console.log(`Película obtenida con ID ${id}`)),
      catchError(err => {
        console.error(`Error al obtener película con ID ${id}`, err);
        // Buscar película en datos de demostración
        const demoMovie = this.demoMovies.find(m => m.id === id);
        if (demoMovie) {
          console.log('Usando datos de demostración como respaldo');
          return of(demoMovie);
        }
        return throwError(() => new Error(`No se encontró la película con ID ${id}`));
      })
    );
  }
  
  /**
   * Crea una nueva película
   * @param movie Datos de la película
   * @returns Observable con la película creada
   */
  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movies`, movie, this.httpOptions).pipe(
      tap(newMovie => console.log(`Película creada con ID ${newMovie.id}`)),
      catchError(this.handleError<Movie>('createMovie'))
    );
  }
  
  /**
   * Actualiza una película existente
   * @param movie Datos actualizados de la película
   * @returns Observable con la película actualizada
   */
  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/movies/${movie.id}`, movie, this.httpOptions).pipe(
      tap(_ => console.log(`Película actualizada con ID ${movie.id}`)),
      catchError(this.handleError<Movie>('updateMovie'))
    );
  }
  
  /**
   * Elimina una película
   * @param id ID de la película a eliminar
   * @returns Observable vacío
   */
  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/movies/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`Película eliminada con ID ${id}`)),
      catchError(this.handleError<any>('deleteMovie'))
    );
  }
  
  /**
   * Maneja errores HTTP
   * @param operation Nombre de la operación que falló
   * @param result Valor opcional para devolver como observable
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falló: ${error.message}`);
      
      // Permite a la aplicación seguir funcionando devolviendo un resultado vacío
      return of(result as T);
    };
  }
}
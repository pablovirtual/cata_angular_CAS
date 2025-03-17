import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
  /** URL base de la API */
  private apiUrl = 'http://localhost/catalogo/public/api';
  
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
   * Obtiene todas las películas desde la API
   * @returns Observable con un array de objetos Movie
   */
  getMovies(): Observable<Movie[]> {
    console.log('Obteniendo todas las películas desde:', `${this.apiUrl}/movies`);
    return this.http.get<any>(`${this.apiUrl}/movies`)
      .pipe(
        map(response => {
          // Si la respuesta está envuelta en un objeto con una propiedad 'data'
          if (response && response.data) {
            return response.data;
          }
          // Si la respuesta es el array directamente
          return response;
        }),
        tap(movies => console.log('Películas recibidas:', movies)),
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene una película específica por su ID
   * @param id ID de la película a obtener
   * @returns Observable con el objeto Movie correspondiente al ID
   */
  getMovie(id: number): Observable<Movie> {
    console.log('Obteniendo película con ID:', id, 'desde:', `${this.apiUrl}/movies/${id}`);
    return this.http.get<any>(`${this.apiUrl}/movies/${id}`)
      .pipe(
        map(response => {
          // Si la respuesta está envuelta en un objeto con una propiedad 'data'
          if (response && response.data) {
            console.log('Película recibida dentro de data:', response.data);
            return response.data;
          }
          console.log('Película recibida directamente:', response);
          // Si la respuesta es el objeto directamente
          return response;
        }),
        tap(movie => console.log('Película procesada y asignada:', movie)),
        catchError(this.handleError)
      );
  }

  /**
   * Crea una nueva película en la base de datos
   * @param movie Objeto Movie con los datos de la nueva película
   * @returns Observable con la respuesta del servidor
   */
  createMovie(movie: Movie): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/movies`, movie, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualiza una película existente
   * @param id ID de la película a actualizar
   * @param movie Objeto Movie con los nuevos datos
   * @returns Observable con la respuesta del servidor
   */
  updateMovie(id: number, movie: Movie): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/movies/${id}`, movie, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Elimina una película existente
   * @param id ID de la película a eliminar
   * @returns Observable con la respuesta del servidor
   */
  deleteMovie(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/movies/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
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
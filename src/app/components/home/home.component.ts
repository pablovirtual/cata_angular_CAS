import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SafePipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // año actual para copyrigth
  currentYear: number = new Date().getFullYear();

  // Rutas de imágenes
  logoImagePath = 'assets/images/logo.jpg';
  backgroundImagePath = 'assets/images/fondo.jpg';

  // Configuración del video
  videoType: 'local' | 'youtube' | 'vimeo' = 'youtube'; // Tipo de video: local, youtube o vimeo
  
  // Propiedades para video local
  videoSource = 'assets/videos/intro.mp4'; // Ruta al video local
  videoFormat = 'video/mp4'; // Formato del video
  videoPoster = 'assets/images/video-poster.jpg'; // Imagen de vista previa
  
  // URLs para videos de plataformas externas
  youtubeVideoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // URL de video de YouTube (ejemplo)
  vimeoVideoUrl = 'https://player.vimeo.com/video/76979871'; // URL de video de Vimeo (ejemplo)
  //Datos del estudiante para el footer
  studentInfo = {
    name: 'Pedro Pablo Rodriguez Gomez',
    id: '227371502',
    university: 'Universidad de Guadalajara',
    course: 'Conceptualizacion de entornos de desarrollo de aplicaciones y servicios'
  };

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Cambia el tipo de video que se muestra
   * @param type Tipo de video a mostrar ('local', 'youtube', 'vimeo')
   */
  changeVideoType(type: 'local' | 'youtube' | 'vimeo'): void {
    this.videoType = type;
  }
}

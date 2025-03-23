import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // año actual para copyrigth
  currentYear: number = new Date().getFullYear();

  // Rutas de imágenes
  logoImagePath = 'assets/images/logo.jpg';
  backgroundImagePath = 'assets/images/fondo.jpg';

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
}

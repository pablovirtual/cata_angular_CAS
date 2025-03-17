import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ CommonModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    // año actual para copyrigth
    currentYear = new Date().getFullYear();

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
}

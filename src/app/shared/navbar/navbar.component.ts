import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Componente de barra de navegación reutilizable
 * 
 * Este componente define una barra de navegación que se puede utilizar en 
 * todos los componentes de la aplicación, proporcionando una experiencia 
 * de usuario consistente.
 * 
 * @fecha 23/03/2025
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // No necesitamos ngOnInit ni manipulación DOM con JavaScript
  // ya que ahora usamos una solución puramente CSS
}

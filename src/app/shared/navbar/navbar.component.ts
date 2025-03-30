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
  // Variable para controlar si el menú está abierto o cerrado
  isMenuOpen = false;
  
  /**
   * Activa o desactiva la visibilidad del menú
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Aplicación directa de clase para mayor compatibilidad con producción
    this.applyMenuState();
  }
  
  /**
   * Cierra el menú si está abierto
   */
  closeMenu(): void {
    this.isMenuOpen = false;
    // Aplicación directa de clase para mayor compatibilidad con producción
    this.applyMenuState();
  }

  /**
   * Aplica el estado del menú directamente al DOM para mayor compatibilidad
   * con entornos de producción
   */
  private applyMenuState(): void {
    // Manipulación directa del DOM para garantizar compatibilidad en producción
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
      if (this.isMenuOpen) {
        navbarCollapse.classList.add('menu-open');
      } else {
        navbarCollapse.classList.remove('menu-open');
      }
    }
  }
}

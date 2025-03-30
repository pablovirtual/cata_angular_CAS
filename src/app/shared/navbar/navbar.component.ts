import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {
  
  /**
   * Inicializa el manejador del menú móvil después de que el componente se carga
   */
  ngOnInit(): void {
    // Implementación directa con JavaScript vanilla para garantizar la compatibilidad en producción
    setTimeout(() => {
      const menuButton = document.getElementById('mobileMenuButton');
      const mobileMenu = document.getElementById('mobileNavMenu');
      
      if (menuButton && mobileMenu) {
        // Evento de clic para el botón que funciona en cualquier entorno
        menuButton.addEventListener('click', () => {
          if (mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
          } else {
            mobileMenu.classList.add('show');
          }
        });
        
        // Cierra el menú cuando se hace clic en un enlace
        const navLinks = mobileMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
          });
        });
      }
    }, 500); // Pequeño retraso para asegurar que los elementos DOM están disponibles
  }
}

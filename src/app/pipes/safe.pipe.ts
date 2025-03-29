import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Pipe para sanitizar URLs y permitir su uso seguro en iframes y otros elementos
 * que requieren URLs confiables para evitar ataques XSS
 */
@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  
  constructor(private sanitizer: DomSanitizer) {}
  
  /**
   * Transforma una URL en una URL segura que puede usarse en iframes
   * @param url La URL a sanitizar
   * @returns SafeResourceUrl - URL sanitizada segura para usar en la aplicación
   */
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

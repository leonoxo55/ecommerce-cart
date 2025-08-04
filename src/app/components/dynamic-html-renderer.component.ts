import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ScriptSecurityService } from '../services/script-security.service';

@Component({
  selector: 'app-dynamic-html-renderer',
  templateUrl: './dynamic-html-renderer.component.html',
  styleUrls: ['./dynamic-html-renderer.component.scss']
})
export class DynamicHtmlRendererComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() htmlContent: string = '';
  @ViewChild('dynamicContent', { static: false }) dynamicContent!: ElementRef;

  public safeHtml: SafeHtml = '';
  private observer: MutationObserver | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private scriptSecurityService: ScriptSecurityService
  ) {}

  ngOnInit(): void {
    this.processHtmlContent();
  }

  ngAfterViewInit(): void {
    this.setupMutationObserver();
    this.executeScripts();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Procesa el contenido HTML y lo sanitiza
   */
  private processHtmlContent(): void {
    if (!this.htmlContent) {
      this.safeHtml = '';
      return;
    }

    // Separar estilos, HTML y scripts
    const { styles, html, scripts } = this.parseHtmlContent(this.htmlContent);

    // Sanitizar el HTML
    const sanitizedHtml = this.scriptSecurityService.sanitizeHtml(html);

    // Combinar estilos y HTML sanitizado
    const processedContent = `
      <style>${styles}</style>
      ${sanitizedHtml}
    `;

    // Marcar como seguro para Angular
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(processedContent);
  }

  /**
   * Parsea el contenido HTML separando estilos, HTML y scripts
   */
  private parseHtmlContent(content: string): { styles: string; html: string; scripts: string[] } {
    const styles: string[] = [];
    const scripts: string[] = [];
    let html = content;

    // Extraer estilos
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let styleMatch;
    while ((styleMatch = styleRegex.exec(content)) !== null) {
      styles.push(styleMatch[1]);
      html = html.replace(styleMatch[0], '');
    }

    // Extraer scripts
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    let scriptMatch;
    while ((scriptMatch = scriptRegex.exec(content)) !== null) {
      scripts.push(scriptMatch[1]);
      html = html.replace(scriptMatch[0], '');
    }

    return {
      styles: styles.join('\n'),
      html: html.trim(),
      scripts
    };
  }

  /**
   * Configura el observer para detectar cambios en el DOM
   */
  private setupMutationObserver(): void {
    if (!this.dynamicContent?.nativeElement) return;

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Re-ejecutar scripts si se agregaron nuevos elementos
          this.executeScripts();
        }
      });
    });

    this.observer.observe(this.dynamicContent.nativeElement, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Ejecuta los scripts de forma segura
   */
  private executeScripts(): void {
    if (!this.dynamicContent?.nativeElement) return;

    // Buscar scripts en el contenido renderizado
    const scripts = this.dynamicContent.nativeElement.querySelectorAll('script');
    
    scripts.forEach((script: HTMLScriptElement) => {
      if (script.textContent) {
        this.scriptSecurityService.executeScriptSafely(script.textContent);
      }
    });
  }

  /**
   * Método público para actualizar el contenido
   */
  public updateContent(newHtmlContent: string): void {
    this.htmlContent = newHtmlContent;
    this.processHtmlContent();
    
    // Re-ejecutar scripts después de actualizar el contenido
    setTimeout(() => {
      this.executeScripts();
    }, 100);
  }

  /**
   * Método para limpiar el contenido
   */
  public clearContent(): void {
    this.htmlContent = '';
    this.safeHtml = '';
  }
}
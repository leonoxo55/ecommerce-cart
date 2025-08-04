import { Injectable } from '@angular/core';
import { SecurityConfig, DEFAULT_SECURITY_CONFIG } from '../models/security-config.model';

@Injectable({
  providedIn: 'root'
})
export class ScriptSecurityService {
  private securityConfig: SecurityConfig = DEFAULT_SECURITY_CONFIG;

  // Lista blanca de funciones permitidas
  private get allowedFunctions(): string[] {
    return this.securityConfig.allowedFunctions;
  }

  // Lista blanca de patrones de funciones permitidas
  private get allowedPatterns(): RegExp[] {
    return this.securityConfig.allowedPatterns;
  }

  /**
   * Valida si una función está en la lista blanca
   */
  private isFunctionAllowed(functionName: string): boolean {
    return this.allowedFunctions.includes(functionName);
  }

  /**
   * Valida si un patrón de código es seguro
   */
  private isPatternAllowed(code: string): boolean {
    return this.allowedPatterns.some(pattern => pattern.test(code));
  }

  /**
   * Extrae y valida las funciones de un script
   */
  private extractAndValidateFunctions(scriptContent: string): string[] {
    const functionCalls: string[] = [];
    
    // Patrones para detectar llamadas a funciones
    const patterns = [
      /(\w+)\s*\(/g, // función()
      /(\w+)\s*\.\s*(\w+)\s*\(/g, // objeto.función()
      /window\.(\w+)\s*\(/g, // window.función()
      /document\.(\w+)\s*\(/g, // document.función()
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(scriptContent)) !== null) {
        if (match[1]) {
          functionCalls.push(match[1]);
        }
        if (match[2]) {
          functionCalls.push(match[2]);
        }
      }
    });

    return functionCalls;
  }

  /**
   * Ejecuta un script de forma segura
   */
  public executeScriptSafely(scriptContent: string): void {
    try {
      // Validar longitud del contenido
      if (scriptContent.length > this.securityConfig.maxContentLength) {
        console.warn('Script demasiado largo, máximo permitido:', this.securityConfig.maxContentLength);
        return;
      }

      // Extraer y validar funciones
      const functionCalls = this.extractAndValidateFunctions(scriptContent);
      
      // Verificar que todas las funciones estén permitidas
      const unauthorizedFunctions = functionCalls.filter(
        func => !this.isFunctionAllowed(func) && !this.isPatternAllowed(func)
      );

      if (unauthorizedFunctions.length > 0) {
        if (this.securityConfig.enableDebugLogs) {
          console.warn('Funciones no autorizadas detectadas:', unauthorizedFunctions);
        }
        return;
      }

      // Crear un contexto seguro para ejecutar el script
      const safeContext = this.createSafeContext();
      
      // Ejecutar el script en el contexto seguro
      const safeScript = this.wrapScriptInSafeContext(scriptContent, safeContext);
      
      // Usar Function constructor para ejecutar el script de forma segura
      const safeFunction = new Function('safeContext', safeScript);
      safeFunction(safeContext);

      if (this.securityConfig.enableDebugLogs) {
        console.log('Script ejecutado exitosamente');
      }

    } catch (error) {
      console.error('Error ejecutando script:', error);
    }
  }

  /**
   * Crea un contexto seguro para la ejecución de scripts
   */
  private createSafeContext(): any {
    return {
      // Funciones permitidas
      llenarNombre: () => {
        console.log('Función llenarNombre ejecutada');
        // Aquí puedes implementar la lógica específica
        const nombreElement = document.querySelector('.hsp-lightbox-default-name');
        if (nombreElement) {
          nombreElement.textContent = 'Usuario Ejemplo';
        }
      },
      
      MarcaResultadoModal: (resultado: number) => {
        console.log('Función MarcaResultadoModal ejecutada con resultado:', resultado);
        // Aquí puedes implementar la lógica específica
        if (resultado === 1) {
          alert('Usuario autorizó el contacto');
        } else {
          alert('Usuario no autorizó el contacto');
        }
      },

      // Funciones de console permitidas
      console: {
        log: console.log.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console)
      },

      // Objetos globales seguros
      window: {
        // Solo propiedades específicas que necesites
      },

      document: {
        querySelector: document.querySelector.bind(document),
        querySelectorAll: document.querySelectorAll.bind(document),
        getElementById: document.getElementById.bind(document)
      }
    };
  }

  /**
   * Envuelve el script en un contexto seguro
   */
  private wrapScriptInSafeContext(scriptContent: string, safeContext: any): string {
    return `
      with (safeContext) {
        ${scriptContent}
      }
    `;
  }

  /**
   * Sanitiza el HTML removiendo scripts peligrosos
   */
  public sanitizeHtml(htmlContent: string): string {
    // Validar longitud del contenido
    if (htmlContent.length > this.securityConfig.maxContentLength) {
      console.warn('HTML demasiado largo, máximo permitido:', this.securityConfig.maxContentLength);
      return '<!-- Contenido demasiado largo -->';
    }

    // Remover scripts externos si no están permitidos
    if (!this.securityConfig.allowExternalScripts) {
      htmlContent = htmlContent.replace(
        /<script[^>]*src\s*=\s*["'][^"']*["'][^>]*>/gi,
        '<!-- Script externo removido por seguridad -->'
      );
    }

    // Remover estilos externos si no están permitidos
    if (!this.securityConfig.allowExternalStyles) {
      htmlContent = htmlContent.replace(
        /<link[^>]*rel\s*=\s*["']stylesheet["'][^>]*>/gi,
        '<!-- Estilo externo removido por seguridad -->'
      );
    }

    // Remover scripts inline peligrosos
    let sanitized = htmlContent.replace(
      /<script[^>]*>[\s\S]*?<\/script>/gi,
      (match) => {
        // Solo permitir scripts que contengan funciones autorizadas
        const hasAllowedFunction = this.allowedFunctions.some(func => 
          match.includes(func)
        );
        
        if (hasAllowedFunction) {
          return match;
        }
        
        return '<!-- Script removido por seguridad -->';
      }
    );

    // Remover atributos onclick, onload, etc. peligrosos
    sanitized = sanitized.replace(
      /\s(on\w+)\s*=\s*["'][^"']*["']/gi,
      ' data-removed-$1'
    );

    // Remover estilos inline si no están permitidos
    if (!this.securityConfig.allowInlineStyles) {
      sanitized = sanitized.replace(
        /<style[^>]*>[\s\S]*?<\/style>/gi,
        '<!-- Estilos inline removidos por seguridad -->'
      );
    }

    return sanitized;
  }

  /**
   * Actualiza la configuración de seguridad
   */
  public updateSecurityConfig(config: Partial<SecurityConfig>): void {
    this.securityConfig = { ...this.securityConfig, ...config };
    
    if (this.securityConfig.enableDebugLogs) {
      console.log('Configuración de seguridad actualizada:', this.securityConfig);
    }
  }

  /**
   * Obtiene la configuración actual de seguridad
   */
  public getSecurityConfig(): SecurityConfig {
    return { ...this.securityConfig };
  }
}
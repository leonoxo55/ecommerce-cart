import { Component, ViewChild } from '@angular/core';
import { DynamicHtmlRendererComponent } from '../components/dynamic-html-renderer.component';
import { ScriptSecurityService } from '../services/script-security.service';

@Component({
  selector: 'app-usage-example',
  template: `
    <div class="example-container">
      <h2>Ejemplos de Uso</h2>
      
      <div class="example-section">
        <h3>1. HTML Básico con Estilos</h3>
        <app-dynamic-html-renderer 
          [htmlContent]="basicHtml">
        </app-dynamic-html-renderer>
      </div>

      <div class="example-section">
        <h3>2. HTML con Scripts Seguros</h3>
        <app-dynamic-html-renderer 
          [htmlContent]="scriptHtml">
        </app-dynamic-html-renderer>
      </div>

      <div class="example-section">
        <h3>3. HTML Dinámico con Variables</h3>
        <div class="controls">
          <input [(ngModel)]="userName" placeholder="Nombre del usuario">
          <button (click)="updateUserHtml()">Actualizar</button>
        </div>
        <app-dynamic-html-renderer 
          [htmlContent]="dynamicUserHtml">
        </app-dynamic-html-renderer>
      </div>

      <div class="example-section">
        <h3>4. Configuración de Seguridad</h3>
        <div class="security-controls">
          <label>
            <input type="checkbox" [(ngModel)]="enableDebugLogs">
            Habilitar logs de debug
          </label>
          <label>
            <input type="checkbox" [(ngModel)]="allowInlineStyles">
            Permitir estilos inline
          </label>
          <button (click)="updateSecuritySettings()">Aplicar Configuración</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .example-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .example-section {
      margin-bottom: 40px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .controls {
      margin-bottom: 15px;
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .controls input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .controls button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .security-controls {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .security-controls label {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .security-controls button {
      padding: 8px 16px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
  `]
})
export class UsageExampleComponent {
  @ViewChild(DynamicHtmlRendererComponent) htmlRenderer!: DynamicHtmlRendererComponent;

  public userName: string = 'Usuario Ejemplo';
  public enableDebugLogs: boolean = true;
  public allowInlineStyles: boolean = true;

  // HTML básico con estilos
  public basicHtml: string = `
    <style>
      .basic-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      }
      .basic-card h2 {
        margin: 0 0 10px 0;
        font-size: 1.5rem;
      }
      .basic-card p {
        margin: 0;
        opacity: 0.9;
      }
    </style>
    <div class="basic-card">
      <h2>¡Hola Mundo!</h2>
      <p>Este es un ejemplo de HTML básico con estilos CSS.</p>
    </div>
  `;

  // HTML con scripts seguros
  public scriptHtml: string = `
    <style>
      .script-demo {
        background-color: #f8f9fa;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
      }
      .counter {
        font-size: 2rem;
        font-weight: bold;
        color: #007bff;
        margin: 10px 0;
      }
      .btn {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin: 5px;
      }
      .btn:hover {
        background-color: #0056b3;
      }
    </style>
    <div class="script-demo">
      <h3>Demo de Scripts Seguros</h3>
      <div class="counter" id="counter">0</div>
      <button class="btn" onclick="incrementCounter()">Incrementar</button>
      <button class="btn" onclick="resetCounter()">Resetear</button>
      <button class="btn" onclick="MarcaResultadoModal(1)">Autorizar</button>
    </div>
    <script>
      let counter = 0;
      
      function incrementCounter() {
        counter++;
        document.getElementById('counter').textContent = counter;
        console.log('Contador incrementado:', counter);
      }
      
      function resetCounter() {
        counter = 0;
        document.getElementById('counter').textContent = counter;
        console.log('Contador reseteado');
      }
      
      // Función permitida
      llenarNombre();
    </script>
  `;

  // HTML dinámico con variables
  public dynamicUserHtml: string = '';

  constructor(private scriptSecurityService: ScriptSecurityService) {
    this.updateUserHtml();
  }

  /**
   * Actualiza el HTML dinámico con el nombre del usuario
   */
  public updateUserHtml(): void {
    this.dynamicUserHtml = `
      <style>
        .user-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .user-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(45deg, #667eea, #764ba2);
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          font-weight: bold;
        }
        .user-name {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 10px;
        }
        .user-info {
          color: #666;
          font-size: 0.9rem;
        }
      </style>
      <div class="user-card">
        <div class="user-avatar">
          ${this.userName.charAt(0).toUpperCase()}
        </div>
        <div class="user-name">${this.userName}</div>
        <div class="user-info">
          Usuario registrado en el sistema
        </div>
        <button onclick="MarcaResultadoModal(1)" style="margin-top: 15px; padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Ver Perfil
        </button>
      </div>
    `;
  }

  /**
   * Actualiza la configuración de seguridad
   */
  public updateSecuritySettings(): void {
    this.scriptSecurityService.updateSecurityConfig({
      enableDebugLogs: this.enableDebugLogs,
      allowInlineStyles: this.allowInlineStyles
    });
  }
}
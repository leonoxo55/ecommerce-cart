# Dynamic HTML Renderer - Angular 16

Un componente de Angular 16 que permite renderizar HTML dinámico de forma segura, incluyendo estilos CSS y scripts JavaScript validados.

## Características

- ✅ **Renderizado seguro de HTML dinámico**
- ✅ **Ejecución de scripts con lista blanca de funciones**
- ✅ **Sanitización automática de contenido**
- ✅ **Validación de patrones de código**
- ✅ **Soporte para estilos CSS inline**
- ✅ **Contexto seguro para ejecución de scripts**
- ✅ **Detección de cambios en el DOM**

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir para producción
npm run build
```

## Uso Básico

### 1. Importar el componente

```typescript
import { DynamicHtmlRendererComponent } from './components/dynamic-html-renderer.component';
```

### 2. Usar en tu template

```html
<app-dynamic-html-renderer 
  [htmlContent]="tuHtmlDinamico">
</app-dynamic-html-renderer>
```

### 3. En tu componente

```typescript
export class TuComponente {
  public tuHtmlDinamico: string = `
    <style>
      .mi-clase { color: red; }
    </style>
    <div class="mi-clase">
      <h1>Hola Mundo</h1>
      <button onclick="miFuncion()">Click me</button>
    </div>
    <script>
      function miFuncion() {
        console.log('Función ejecutada');
      }
    </script>
  `;
}
```

## Funciones Permitidas

El componente incluye una lista blanca de funciones que pueden ejecutarse de forma segura:

### Funciones Predefinidas
- `llenarNombre()` - Llena el nombre del usuario en el modal
- `MarcaResultadoModal(resultado)` - Maneja la respuesta del modal (1 = autoriza, 0 = no autoriza)

### Funciones de Console
- `console.log()`
- `console.warn()`
- `console.error()`

### Agregar Nuevas Funciones

Para agregar nuevas funciones a la lista blanca, edita el archivo `src/app/services/script-security.service.ts`:

```typescript
private readonly allowedFunctions: string[] = [
  'llenarNombre',
  'MarcaResultadoModal',
  'console.log',
  'console.warn',
  'console.error',
  'tuNuevaFuncion' // Agregar aquí
];
```

## Seguridad

### Características de Seguridad

1. **Lista Blanca de Funciones**: Solo las funciones autorizadas pueden ejecutarse
2. **Sanitización de HTML**: Remoción automática de scripts peligrosos
3. **Contexto Seguro**: Los scripts se ejecutan en un contexto aislado
4. **Validación de Patrones**: Verificación de patrones de código seguros
5. **Remoción de Atributos Peligrosos**: Los atributos `onclick`, `onload`, etc. son removidos

### Ejemplo de HTML Seguro

```html
<style>
  .modal-content {
    background-color: #FFF;
    border-radius: 10px;
  }
</style>
<div class="modal-content">
  <h1>Título</h1>
  <button onclick="MarcaResultadoModal(1)">Autorizar</button>
</div>
<script>
  llenarNombre(); // ✅ Permitido
  console.log('Hola'); // ✅ Permitido
  // eval('alert("xss")'); // ❌ Bloqueado
</script>
```

## API del Componente

### Inputs

- `htmlContent: string` - El contenido HTML a renderizar

### Métodos Públicos

- `updateContent(newHtmlContent: string)` - Actualiza el contenido dinámicamente
- `clearContent()` - Limpia el contenido

### Ejemplo de Uso Avanzado

```typescript
export class MiComponente {
  @ViewChild(DynamicHtmlRendererComponent) htmlRenderer!: DynamicHtmlRendererComponent;

  actualizarContenido() {
    const nuevoHtml = '<div>Nuevo contenido</div>';
    this.htmlRenderer.updateContent(nuevoHtml);
  }

  limpiarContenido() {
    this.htmlRenderer.clearContent();
  }
}
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── dynamic-html-renderer.component.ts
│   │   ├── dynamic-html-renderer.component.html
│   │   ├── dynamic-html-renderer.component.scss
│   │   ├── demo.component.ts
│   │   ├── demo.component.html
│   │   └── demo.component.scss
│   ├── services/
│   │   └── script-security.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   └── app.module.ts
├── main.ts
├── polyfills.ts
├── index.html
└── styles.scss
```

## Personalización

### Agregar Nuevos Patrones de Validación

```typescript
// En script-security.service.ts
private readonly allowedPatterns: RegExp[] = [
  /^[a-zA-Z_$][a-zA-Z0-9_$]*$/,
  /^window\.[a-zA-Z_$][a-zA-Z0-9_$]*$/,
  /^document\.[a-zA-Z_$][a-zA-Z0-9_$]*$/,
  /^tuNuevoPatron$/ // Agregar aquí
];
```

### Modificar el Contexto Seguro

```typescript
private createSafeContext(): any {
  return {
    // Funciones existentes...
    
    // Agregar nuevas funciones
    tuNuevaFuncion: () => {
      console.log('Nueva función ejecutada');
      // Tu lógica aquí
    }
  };
}
```

## Troubleshooting

### Problemas Comunes

1. **Los estilos no se aplican**: Asegúrate de que los estilos estén dentro de la etiqueta `<style>`
2. **Los scripts no se ejecutan**: Verifica que las funciones estén en la lista blanca
3. **Errores de seguridad**: Revisa la consola para ver qué funciones fueron bloqueadas

### Debug

El componente incluye logs de debug en la consola:
- Funciones autorizadas ejecutadas
- Funciones bloqueadas por seguridad
- Errores de ejecución de scripts

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

export interface SecurityConfig {
  allowedFunctions: string[];
  allowedPatterns: RegExp[];
  allowInlineStyles: boolean;
  allowExternalScripts: boolean;
  allowExternalStyles: boolean;
  maxContentLength: number;
  enableDebugLogs: boolean;
}

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  allowedFunctions: [
    'llenarNombre',
    'MarcaResultadoModal',
    'console.log',
    'console.warn',
    'console.error'
  ],
  allowedPatterns: [
    /^[a-zA-Z_$][a-zA-Z0-9_$]*$/, // Nombres de variables/funciones válidos
    /^window\.[a-zA-Z_$][a-zA-Z0-9_$]*$/, // Acceso a propiedades de window
    /^document\.[a-zA-Z_$][a-zA-Z0-9_$]*$/, // Acceso a propiedades de document
  ],
  allowInlineStyles: true,
  allowExternalScripts: false,
  allowExternalStyles: false,
  maxContentLength: 100000, // 100KB
  enableDebugLogs: true
};
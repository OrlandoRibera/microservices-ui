# MicroservicesUi

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 20.0.2.

## Estructura del Proyecto

El proyecto sigue las mejores prácticas de Angular 20 con una estructura de carpetas bien organizada:

```
src/
├── app/
│   ├── core/                 # Servicios singleton, guards, interceptores
│   │   ├── guards/          # Guards de ruta para autenticación y autorización
│   │   ├── interceptors/    # Interceptores HTTP para manejo de peticiones/respuestas
│   │   └── services/        # Servicios core usados en toda la aplicación
│   ├── features/            # Módulos/componentes de características
│   │   └── shared/         # Componentes y utilidades compartidas específicas de características
│   │                       # (usados entre características específicas pero no globalmente)
│   ├── layout/             # Componentes de diseño (header, footer, sidebar, etc.)
│   ├── shared/             # Componentes, directivas y pipes compartidos globalmente
│   │   ├── components/     # Componentes UI reutilizables usados en toda la aplicación
│   │   ├── directives/     # Directivas de utilidad globales
│   │   └── pipes/         # Pipes comunes usados en toda la aplicación
│   └── store/              # Gestión de estado usando Angular Signals
├── assets/                 # Recursos estáticos
│   ├── images/            # Archivos de imágenes
│   ├── icons/             # Archivos de iconos
│   └── styles/            # Archivos de estilos y temas globales
└── environments/           # Archivos de configuración de entorno
```

### Explicación de Directorios Compartidos

1. **app/shared/** (Compartido Global)
   - Contiene componentes verdaderamente globales, compartidos en toda la aplicación
   - Usados en múltiples características y no específicos de ninguna característica en particular
   - Ejemplos:
     - Componentes UI comunes (botones, tarjetas, modales)
     - Directivas de utilidad (click fuera, scroll)
     - Pipes comunes (formateo de fecha, moneda)
     - Interfaces y tipos globales
     - Utilidades y ayudantes comunes

2. **app/features/shared/** (Compartido Específico de Características)
   - Contiene componentes y utilidades compartidas entre características específicas
   - Más específicos del dominio y podrían no usarse en toda la aplicación
   - Ejemplos:
     - Componentes UI específicos de características
     - Modelos de datos específicos de características
     - Utilidades específicas de características
     - Componentes usados por múltiples características pero ligados al dominio del negocio

## Autenticación y Organización de Módulos

La aplicación implementa un sistema de autenticación seguro con módulos de características cargados de forma diferida. Así es como está organizado:

### Flujo de Autenticación
```
src/app/features/auth/
├── components/
│   ├── login/
│   └── register/
├── services/
│   └── auth.service.ts      # Servicio de autenticación
└── guards/
    └── auth.guard.ts        # Guard de ruta para rutas protegidas
```

### Estructura de Módulos de Características
```
src/app/features/
├── auth/                    # Módulo de autenticación
├── dashboard/              # Módulo de dashboard (protegido)
├── users/                 # Módulo de gestión de usuarios (protegido)
└── shared/               # Componentes compartidos de características
```

### Gestión de Estado
```
src/app/store/
├── auth/                  # Estado de autenticación
│   ├── auth.state.ts     # Interfaz de estado de autenticación
│   └── auth.store.ts     # Gestión de estado de autenticación
└── app.state.ts          # Estado raíz de la aplicación
```

### Comunicación Entre Módulos

1. **Gestión de Estado con Signals**
   - Uso de Angular Signals para gestión de estado reactiva
   - Estado centralizado en el directorio store
   - Estado específico de características en sus respectivos directorios

2. **Comunicación por Servicios**
   - Servicios core en `core/services/`
   - Servicios específicos de características en sus respectivos directorios
   - Uso de inyección de dependencias para compartir servicios

3. **Guards de Ruta**
   - Guard de autenticación en `core/guards/`
   - Guards específicos de características en sus respectivos directorios

4. **Interceptores HTTP**
   - Interceptor de autenticación para manejo de JWT
   - Interceptor de manejo de errores
   - Interceptor de estado de carga

### Mejores Prácticas de Seguridad

1. **Protección de Rutas**
   - Todas las rutas excepto login/register están protegidas
   - Implementación de control de acceso basado en roles (RBAC)
   - Carga diferida para mejor rendimiento

2. **Gestión de Tokens**
   - Almacenamiento de token JWT en cookies HTTP-only seguras
   - Mecanismo de actualización de token
   - Manejo automático de tokens en interceptores

3. **Manejo de Errores**
   - Manejo centralizado de errores
   - Mensajes de error amigables para el usuario
   - Registro apropiado de errores

### Ejemplo de Comunicación Entre Módulos

```typescript
// auth.service.ts
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = signal<AuthState>({ isAuthenticated: false, user: null });
  
  // Exponer estado como solo lectura
  readonly authState$ = this.authState.asReadonly();
  
  // Métodos para autenticación
  login(credentials: LoginCredentials) {
    // Implementación
  }
  
  logout() {
    // Implementación
  }
}

// Componente protegido
@Component({
  standalone: true
})
export class ProtectedComponent {
  private authService = inject(AuthService);
  
  // Acceder al estado de autenticación
  authState = this.authService.authState$;
}
```

Esta arquitectura asegura:
- Flujo de autenticación seguro
- Clara separación de responsabilidades
- Comunicación eficiente entre módulos
- Base de código escalable y mantenible
- Gestión de estado con seguridad de tipos
- Manejo apropiado de errores
- Optimización de rendimiento mediante carga diferida 
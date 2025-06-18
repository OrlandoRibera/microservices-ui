# MicroservicesUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Project Structure

The project follows Angular 20 best practices with a well-organized folder structure:

```
src/
├── app/
│   ├── core/                 # Singleton services, guards, interceptors
│   │   ├── guards/          # Route guards for authentication and authorization
│   │   ├── interceptors/    # HTTP interceptors for request/response handling
│   │   └── services/        # Core services used throughout the application
│   ├── features/            # Feature modules/components
│   │   └── shared/         # Feature-specific shared components and utilities
│   │                       # (used between specific features but not globally)
│   ├── layout/             # Layout components (header, footer, sidebar, etc.)
│   ├── shared/             # Global shared components, directives, pipes
│   │   ├── components/     # Reusable UI components used across the entire app
│   │   ├── directives/     # Global utility directives
│   │   └── pipes/         # Common pipes used throughout the application
│   └── store/              # State management using Angular Signals
├── assets/                 # Static assets
│   ├── images/            # Image files
│   ├── icons/             # Icon files
│   └── styles/            # Global styles and theme files
└── environments/           # Environment configuration files
```

### Shared Directories Explanation

1. **app/shared/** (Global Shared)
   - Contains truly global, application-wide shared components
   - Used across multiple features and not specific to any particular feature
   - Examples:
     - Common UI components (buttons, cards, modals)
     - Utility directives (click outside, scroll)
     - Common pipes (date formatting, currency)
     - Global interfaces and types
     - Common utilities and helpers

2. **app/features/shared/** (Feature-Specific Shared)
   - Contains components and utilities shared between specific features
   - More domain-specific and might not be used across the entire application
   - Examples:
     - Feature-specific UI components
     - Feature-specific data models
     - Feature-specific utilities
     - Components used by multiple features but tied to the business domain

This structure follows Angular 20 best practices by:
- Using standalone components (no NgModules)
- Organizing code by feature and functionality
- Separating concerns (core, features, shared)
- Following the principle of modularity
- Making it easy to implement lazy loading
- Supporting scalability and maintainability

## Authentication and Module Organization

The application implements a secure authentication system with lazy-loaded feature modules. Here's how it's organized:

### Authentication Flow
```
src/app/features/auth/
├── components/
│   ├── login/
│   └── register/
├── services/
│   └── auth.service.ts      # Authentication service
└── guards/
    └── auth.guard.ts        # Route guard for protected routes
```

### Feature Modules Structure
```
src/app/features/
├── auth/                    # Authentication module
├── dashboard/              # Dashboard module (protected)
├── users/                 # Users management module (protected)
└── shared/               # Shared feature components
```

### State Management
```
src/app/store/
├── auth/                  # Authentication state
│   ├── auth.state.ts     # Auth state interface
│   └── auth.store.ts     # Auth state management
└── app.state.ts          # Root application state
```

### Communication Between Modules

1. **State Management with Signals**
   - Use Angular Signals for reactive state management
   - Centralized state in the store directory
   - Feature-specific state in respective feature directories

2. **Service Communication**
   - Core services in `core/services/`
   - Feature-specific services in respective feature directories
   - Use dependency injection for service sharing

3. **Route Guards**
   - Authentication guard in `core/guards/`
   - Feature-specific guards in respective feature directories

4. **HTTP Interceptors**
   - Authentication interceptor for JWT handling
   - Error handling interceptor
   - Loading state interceptor

### Security Best Practices

1. **Route Protection**
   - All routes except login/register are protected
   - Role-based access control (RBAC) implementation
   - Lazy loading for better performance

2. **Token Management**
   - JWT token storage in secure HTTP-only cookies
   - Token refresh mechanism
   - Automatic token handling in interceptors

3. **Error Handling**
   - Centralized error handling
   - User-friendly error messages
   - Proper error logging

### Module Communication Example

```typescript
// auth.service.ts
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = signal<AuthState>({ isAuthenticated: false, user: null });
  
  // Expose state as readonly
  readonly authState$ = this.authState.asReadonly();
  
  // Methods for authentication
  login(credentials: LoginCredentials) {
    // Implementation
  }
  
  logout() {
    // Implementation
  }
}

// Protected component
@Component({
  standalone: true
})
export class ProtectedComponent {
  private authService = inject(AuthService);
  
  // Access auth state
  authState = this.authService.authState$;
}
```

This architecture ensures:
- Secure authentication flow
- Clear separation of concerns
- Efficient module communication
- Scalable and maintainable codebase
- Type-safe state management
- Proper error handling
- Performance optimization through lazy loading

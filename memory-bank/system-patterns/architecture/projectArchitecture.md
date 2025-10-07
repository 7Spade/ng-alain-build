# Project Architecture

## System Overview
ng-alain is a comprehensive admin panel framework built on Angular 20 with ng-zorro-antd UI components.

## Architecture Layers

### 1. Presentation Layer
- **Framework**: Angular 20.3.0
- **UI Components**: ng-zorro-antd 20.3.1
- **Admin Framework**: ng-alain 20.0.2
- **Styling**: Less with dynamic theme support

### 2. Application Layer
- **Core Services**: @delon/* modules
  - @delon/abc: Admin components (ST, SE, etc.)
  - @delon/acl: Access control
  - @delon/auth: Authentication
  - @delon/cache: Caching system
  - @delon/chart: Chart components
  - @delon/form: Form handling
  - @delon/mock: Mock data
  - @delon/theme: Theming system
  - @delon/util: Utility functions

### 3. Infrastructure Layer
- **Build System**: Angular CLI with high memory allocation
- **Package Management**: Yarn 4.9.2
- **Code Quality**: ESLint + Stylelint + Prettier
- **Testing**: Jasmine + Karma + Protractor
- **Development Tools**: HMR, Proxy configuration

## Module Structure
```
src/app/
├── core/           # Core services, guards, interceptors
├── layout/         # Layout components (basic, blank, passport)
├── routes/         # Feature modules and routing
│   ├── dashboard/  # Dashboard components
│   ├── delon/      # ng-alain demo components
│   ├── pro/        # Pro components
│   └── ...
└── shared/         # Shared modules and utilities
```

## Key Architectural Patterns
- **Lazy Loading**: Route-based code splitting
- **Modular Design**: Feature-based module organization
- **Service Layer**: Centralized business logic
- **Component Composition**: Reusable UI components
- **Theme System**: Dynamic theming with ng-alain-plugin-theme

## Performance Considerations
- **Memory Optimization**: 8GB allocation for builds
- **Bundle Analysis**: Source map explorer integration
- **Tree Shaking**: Automatic unused code elimination
- **Lazy Loading**: On-demand module loading

## Architecture Decisions

### Core Architecture Decisions
- **Standalone Components**: 100% adoption of Angular standalone components, removing NgModule complexity
- **Service-based State Management**: Using Angular services with RxJS instead of NgRx for simpler state management
- **Hash Routing**: Using hash-based routing for simplified deployment without server configuration
- **Lazy Loading Strategy**: All feature modules use lazy loading for optimal bundle splitting
- **Path Alias System**: TypeScript path mapping for cleaner imports and easier refactoring
- **URL as State**: Leveraging router state for application state management
- **Template Organization**: Inline templates for components <150 lines, external for complex components
- **Grid Layout**: CSS Grid for responsive card-based layouts with auto-fill patterns

### Technology Stack Decisions
- **CSS Preprocessor**: Less chosen for seamless integration with ng-zorro-antd theming system
- **TypeScript Configuration**: Strict mode enabled for maximum type safety
- **HTTP Client**: Using @delon/theme _HttpClient for unified error handling and loading states
- **Mock Development**: Mock-first development approach using @delon/mock for parallel frontend/backend development
- **Build Configuration**: High memory allocation (8GB) for large Angular applications
- **Theme System**: ng-alain-plugin-theme for dynamic theming support
- **Icon System**: ng-alain:plugin icon for icon generation

### Development Pattern Decisions
- **Functional Guards**: Using CanActivateFn instead of class-based guards for modern Angular patterns
- **Dependency Injection**: Preferring inject() function over constructor DI for cleaner code
- **Change Detection**: OnPush strategy enforced for optimal performance
- **Control Flow**: Native Angular control flow (@if, @for, @switch) instead of structural directives
- **Explicit Imports**: Each component explicitly declares all dependencies for better tree-shaking
- **Type-Safe Everything**: 100% TypeScript with complete type definitions
- **Observable Streams**: RxJS Observable as primary data source for reactive programming

### Performance Optimization Decisions
- **Bundle Optimization**: Tree-shaking, lazy loading, source map analysis
- **Runtime Optimization**: OnPush detection, trackBy functions, proper subscription cleanup
- **Memory Management**: High memory allocation for builds, proper memory leak prevention
- **Caching Strategy**: @delon/cache for application-level caching with expiration

## Six Core Design Principles System

### A. Architecture Design Principles
1. **Standalone First**: 100% standalone components, no NgModule complexity
2. **Lazy Loading Everywhere**: Three-level lazy loading strategy
3. **Feature Module Organization**: Clear directory structure with feature-based modules
4. **Path Alias System**: TypeScript path mapping for cleaner imports (@shared, @core, @organization)
5. **Layered Routing with Guards**: Hierarchical routing with functional guards

### B. Component Design Principles
1. **OnPush Detection Strategy**: All components use OnPush change detection
2. **Explicit Imports**: Explicit imports over shared imports for better tree-shaking
3. **Native Control Flow**: @if, @for, @switch instead of structural directives
4. **Inline Templates for Cohesion**: Inline templates for components <150 lines
5. **Mobile-First Responsive**: CSS Grid with responsive design patterns

### C. Data State Management Principles
1. **Service-based State**: Service layer with RxJS for state management
2. **Observable Streams**: Reactive data flow with Observable patterns
3. **Type-Safe Everything**: Complete TypeScript type definitions
4. **URL as State**: URL as primary state source for shareable state
5. **Cache Service**: @delon/cache for caching strategy (planned)

### D. Permission Security Principles
1. **Functional Guards**: inject() function-based guards for modern patterns
2. **Role-based Access Control**: Owner/Admin/Member/Viewer hierarchy
3. **Observable-based Authorization**: Asynchronous permission validation
4. **User Feedback on Denial**: Clear denial reasons with user notifications
5. **Graceful Error Handling**: Unified error handling with proper user feedback

### E. Development Experience Principles
1. **Mock-First Development**: @delon/mock for complete CRUD simulation
2. **Hot Module Replacement**: HMR for faster development cycles
3. **High Memory Build**: --max_old_space_size=8000 for large builds
4. **Linting & Formatting**: ESLint + Stylelint + Prettier integration
5. **Git Hooks Integration**: Husky + lint-staged for pre-commit checks

### F. UI/UX Principles
1. **ng-zorro-antd Over Custom**: Prioritize ng-zorro components over custom implementations
2. **Empty States Everywhere**: Complete empty state handling for all lists
3. **Loading States**: Loading states for all asynchronous operations
4. **Hover Effects**: Micro-interactions for enhanced user experience
5. **GitHub-style Navigation**: Learning from GitHub navigation patterns
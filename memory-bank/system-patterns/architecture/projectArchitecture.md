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

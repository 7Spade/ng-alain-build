# Memory Bank: System Patterns

## Project Architecture
- **Framework**: Angular 20.3.0
- **Admin Framework**: ng-alain 20.0.2
- **UI Components**: ng-zorro-antd 20.3.1
- **Build Tool**: Angular CLI with high memory allocation (--max_old_space_size=8000)
- **Package Manager**: Yarn 4.9.2
- **Styling**: Less with theme support

## Key Dependencies
### Core Angular
- @angular/core: ^20.3.0
- @angular/common: ^20.3.0
- @angular/forms: ^20.3.0
- @angular/router: ^20.3.0

### ng-alain Modules
- @delon/abc: ^20.0.2 (Admin components)
- @delon/acl: ^20.0.2 (Access control)
- @delon/auth: ^20.0.2 (Authentication)
- @delon/cache: ^20.0.2 (Caching)
- @delon/chart: ^20.0.2 (Charts)
- @delon/form: ^20.0.2 (Forms)
- @delon/mock: ^20.0.2 (Mock data)
- @delon/theme: ^20.0.2 (Theming)
- @delon/util: ^20.0.2 (Utilities)

### UI & Styling
- ng-zorro-antd: ^20.3.1 (Ant Design components)
- ngx-tinymce: ^20.0.0 (Rich text editor)

## Development Patterns
- **Component Style**: Less
- **Linting**: ESLint + Stylelint
- **Testing**: Jasmine + Karma + Protractor
- **Code Quality**: Prettier + Husky + lint-staged
- **Theme**: ng-alain-plugin-theme for dynamic theming
- **Icons**: ng-alain:plugin icon for icon generation

## Build Configuration
- **Memory Optimization**: High memory allocation for large builds
- **Source Maps**: Available for development and analysis
- **Bundle Analysis**: source-map-explorer integration
- **Proxy**: proxy.conf.js for API development

## Project Structure
```
src/
├── app/
│   ├── core/           # Core services and guards
│   ├── layout/         # Layout components
│   ├── routes/         # Route modules
│   └── shared/         # Shared modules and utilities
├── assets/             # Static assets and themes
└── environments/       # Environment configurations
```

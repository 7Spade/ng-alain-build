# Development Patterns

## Angular Development Patterns

### Component Patterns
- **Smart/Dumb Components**: Separation of container and presentational components
- **Reactive Forms**: FormGroup and FormControl usage
- **OnPush Change Detection**: Performance optimization strategy
- **Component Composition**: Building complex UIs from simple components

### Service Patterns
- **Singleton Services**: Shared business logic
- **Injectable Services**: Dependency injection
- **Observable Services**: RxJS-based data flow
- **Guard Services**: Route protection and validation

### State Management Patterns
- **Service-based State**: Centralized state management
- **Reactive State**: Observable-based state updates
- **Local Component State**: Component-scoped state
- **Cache Management**: @delon/cache integration

## ng-alain Specific Patterns

### Admin Panel Patterns
- **ST (Simple Table)**: Data table with built-in features
- **SE (Search Engine)**: Advanced search and filtering
- **ACL Integration**: Role-based access control
- **Theme Integration**: Dynamic theming support

### Form Patterns
- **Schema-driven Forms**: JSON schema form generation
- **Validation Patterns**: Built-in and custom validators
- **Dynamic Forms**: Runtime form generation
- **Form State Management**: Reactive form patterns

### Layout Patterns
- **Responsive Layout**: Mobile-first design approach
- **Sidebar Navigation**: Collapsible navigation
- **Breadcrumb Navigation**: Hierarchical navigation
- **Header Actions**: Toolbar and action buttons

## Code Quality Patterns

### Linting Patterns
- **ESLint Rules**: TypeScript and Angular specific rules
- **Stylelint Rules**: Less file linting
- **Prettier Formatting**: Consistent code formatting
- **Husky Hooks**: Pre-commit validation

### Testing Patterns
- **Unit Testing**: Jasmine + Karma
- **Component Testing**: Angular Testing Utilities
- **E2E Testing**: Protractor integration
- **Mock Data**: @delon/mock integration

## Performance Patterns

### Build Optimization
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Route-based splitting
- **Bundle Analysis**: Source map explorer
- **Memory Management**: High memory allocation

### Runtime Optimization
- **OnPush Strategy**: Change detection optimization
- **Lazy Loading**: On-demand module loading
- **Caching**: @delon/cache implementation
- **Virtual Scrolling**: Large dataset handling

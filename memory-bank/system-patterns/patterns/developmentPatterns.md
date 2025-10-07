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

## Modern Angular Patterns

### Standalone Component Patterns
- **Component Definition**: Using standalone: true for all components
- **Import Management**: Explicit imports array for dependencies
- **Module Elimination**: Removing NgModule declarations
- **Bootstrap Application**: Using bootstrapApplication instead of bootstrapModule

### Functional Guard Patterns
- **CanActivateFn**: Using functional guards instead of class-based guards
- **inject() Usage**: Modern dependency injection with inject() function
- **Guard Composition**: Combining multiple functional guards
- **Type Safety**: Leveraging TypeScript for guard parameter types

### State Management Patterns
- **Service-based State**: Centralized state management with Angular services
- **RxJS Integration**: Observable-based data flow
- **URL as State**: Using router state for application state
- **Local Component State**: Component-scoped state management

### Template Patterns
- **Native Control Flow**: Using @if, @for, @switch instead of structural directives
- **Template Inlining**: Inline templates for components <150 lines
- **Separated Templates**: External templates for complex components
- **Grid Layout**: CSS Grid for card-based layouts

## ng-alain Development Patterns

### Component Development Patterns
- **Standalone Component Template**: Complete standalone component with inject() DI
- **Component Size Limits**: <100 lines inline, 100-300 lines consider separation, >300 lines must separate
- **Single Responsibility**: Each component handles one specific responsibility
- **OnPush Strategy**: All components use OnPush change detection for optimal performance

### Service Development Patterns
- **Injectable providedIn root**: All services use providedIn: 'root' for tree-shaking
- **@delon/theme _HttpClient**: Use @delon's _HttpClient wrapper for unified error handling
- **RESTful API Convention**: Strict adherence to REST standards with proper HTTP methods
- **Observable Return Types**: All service methods return Observable, not Promise

### Guard Development Patterns
- **Functional Guard Template**: Use CanActivateFn instead of class-based guards
- **Guard Naming Convention**: Feature + Permission Level + Guard (e.g., orgOwnerGuard)
- **Error Handling**: Complete error handling with user notifications
- **Permission Validation**: Always validate input parameters before processing

### Routing Development Patterns
- **Layered Route Structure**: Layout → Feature Module → Sub-features
- **Route Data for Metadata**: All routes should have data properties (title, permission)
- **Lazy Loading**: Use loadComponent for optimal bundle splitting
- **Route Guards**: Implement appropriate guards for route protection

### Styling Development Patterns
- **BEM Naming Convention**: Block__Element--Modifier pattern
- **CSS Grid for Layouts**: Prefer CSS Grid over Flexbox for responsive layouts
- **Design Tokens**: Use Less variables for consistent design system
- **Mobile-First**: Responsive design with mobile-first approach

### Performance Optimization Patterns
- **trackBy in @for Loops**: All @for loops must use track for performance
- **OnPush + Manual detectChanges**: Explicit change detection control
- **Lazy Load Heavy Dependencies**: Load heavy dependencies on-demand
- **Bundle Optimization**: Tree shaking, code splitting, bundle analysis

### Security Patterns
- **Input Validation**: Always validate user inputs
- **Complete Error Handling**: Comprehensive error handling with user feedback
- **Avoid Function Calls in Templates**: Use pipes or pre-computed values
- **Safe Navigation**: Use safe navigation operators and null checks

### Data Model Patterns
- **Interface for Data**: Use interfaces for data structures, enums for constants
- **Separate Request/Response Types**: Different interfaces for different operations
- **Type Safety**: Strict TypeScript configuration with no any types
- **Immutable Updates**: Use spread operator for immutable state updates

### Mock Data Patterns
- **Complete CRUD Operations**: Mock must support full CRUD operations
- **Realistic Data Relationships**: Mock data should simulate real business logic
- **Query Parameter Support**: Support for pagination, search, and filtering
- **Memory Persistence**: Mock data should persist in memory during session

### Dependency Management Patterns
- **Lock Major Versions**: Use ^ for patch updates, lock major versions
- **Regular Updates**: Monthly dependency updates with careful testing
- **Version Compatibility**: Ensure Angular and ng-alain version compatibility
- **Tree Shaking**: Use providedIn: 'root' for optimal tree shaking

### Internationalization Patterns
- **i18n for All Text**: Use i18n pipe for all user-facing text
- **Namespace Organization**: Feature.component.element naming structure
- **Translation Keys**: Consistent translation key structure
- **Fallback Handling**: Proper fallback for missing translations

## Development Principles Integration

### Component Development Principles
- **Standalone Component Template**: Complete standalone component with inject() DI
- **Component Size Limits**: <100 lines inline, 100-300 lines consider separation, >300 lines must separate
- **Single Responsibility**: Each component handles one specific responsibility
- **OnPush Strategy**: All components use OnPush change detection for optimal performance

### Service Development Principles
- **Injectable providedIn root**: All services use providedIn: 'root' for tree-shaking
- **@delon/theme _HttpClient**: Use @delon's _HttpClient wrapper for unified error handling
- **RESTful API Convention**: Strict adherence to REST standards with proper HTTP methods
- **Observable Return Types**: All service methods return Observable, not Promise

### Guard Development Principles
- **Functional Guard Template**: Use CanActivateFn instead of class-based guards
- **Guard Naming Convention**: Feature + Permission Level + Guard (e.g., orgOwnerGuard)
- **Error Handling**: Complete error handling with user notifications
- **Permission Validation**: Always validate input parameters before processing

### Routing Development Principles
- **Layered Route Structure**: Layout → Feature Module → Sub-features
- **Route Data for Metadata**: All routes should have data properties (title, permission)
- **Lazy Loading**: Use loadComponent for optimal bundle splitting
- **Route Guards**: Implement appropriate guards for route protection

### Styling Development Principles
- **BEM Naming Convention**: Block__Element--Modifier pattern
- **CSS Grid for Layouts**: Prefer CSS Grid over Flexbox for responsive layouts
- **Design Tokens**: Use Less variables for consistent design system
- **Mobile-First**: Responsive design with mobile-first approach

### Performance Optimization Principles
- **trackBy in @for Loops**: All @for loops must use track for performance
- **OnPush + Manual detectChanges**: Explicit change detection control
- **Lazy Load Heavy Dependencies**: Load heavy dependencies on-demand
- **Bundle Optimization**: Tree shaking, code splitting, bundle analysis

### Security Principles
- **Input Validation**: Always validate user inputs
- **Complete Error Handling**: Comprehensive error handling with user feedback
- **Avoid Function Calls in Templates**: Use pipes or pre-computed values
- **Safe Navigation**: Use safe navigation operators and null checks

### Data Model Principles
- **Interface for Data**: Use interfaces for data structures, enums for constants
- **Separate Request/Response Types**: Different interfaces for different operations
- **Type Safety**: Strict TypeScript configuration with no any types
- **Immutable Updates**: Use spread operator for immutable state updates

### Mock Data Principles
- **Complete CRUD Operations**: Mock must support full CRUD operations
- **Realistic Data Relationships**: Mock data should simulate real business logic
- **Query Parameter Support**: Support for pagination, search, and filtering
- **Memory Persistence**: Mock data should persist in memory during session

### Dependency Management Principles
- **Lock Major Versions**: Use ^ for patch updates, lock major versions
- **Regular Updates**: Monthly dependency updates with careful testing
- **Version Compatibility**: Ensure Angular and ng-alain version compatibility
- **Tree Shaking**: Use providedIn: 'root' for optimal tree shaking

### Internationalization Principles
- **i18n for All Text**: Use i18n pipe for all user-facing text
- **Namespace Organization**: Feature.component.element naming structure
- **Translation Keys**: Consistent translation key structure
- **Fallback Handling**: Proper fallback for missing translations

### Code Review Checklist
- **Architecture**: Standalone components, lazy loading, proper guards, providedIn: 'root'
- **Performance**: OnPush strategy, trackBy in loops, avoid function calls in templates
- **Type Safety**: All parameters typed, avoid any, Observable return types
- **User Experience**: Loading states, empty states, error notifications, responsive design
- **Code Quality**: ESLint compliance, Stylelint compliance, proper comments, README files
  
### Performance Patterns
- **OnPush Strategy**: Change detection optimization
- **TrackBy Functions**: Optimized list rendering with trackBy
- **Lazy Loading**: On-demand module loading
- **Caching**: @delon/cache implementation
- **Virtual Scrolling**: Large dataset handling
- **Bundle Optimization**: Tree-shaking and code splitting

### Error Handling Patterns
- **Observable Error Handling**: catchError operator usage
- **User Feedback**: Notification service integration
- **Graceful Degradation**: Fallback behaviors
- **Error Logging**: Console error logging with context

### Form Patterns
- **Reactive Forms**: FormGroup and FormControl usage
- **Schema-driven Forms**: JSON schema form generation
- **Validation Patterns**: Built-in and custom validators
- **Dynamic Forms**: Runtime form generation
- **Form State Management**: Reactive form patterns

### Testing Patterns
- **Unit Testing**: Jasmine + Karma setup
- **Component Testing**: Angular Testing Utilities
- **E2E Testing**: Protractor integration
- **Mock Data**: @delon/mock integration
- **Test Structure**: Arrange, Act, Assert pattern
- **Coverage Requirements**: >80% code coverage

### Security Patterns
- **Route Guards**: Functional guards for route protection
- **ACL Integration**: Role-based access control
- **Input Validation**: Form validation and sanitization
- **Token Management**: Secure token handling
- **Session Management**: Proper session handling
# Code Standards

## TypeScript Standards

### Type Definitions
- **Strict Mode**: Enable strict TypeScript compilation
- **Interface Definitions**: Use interfaces for object shapes
- **Type Guards**: Implement proper type checking
- **Generic Types**: Use generics for reusable components
- **Union Types**: Leverage union types for flexible APIs

### Naming Conventions
- **PascalCase**: Classes, interfaces, enums
- **camelCase**: Variables, functions, methods
- **kebab-case**: File names, component selectors
- **UPPER_CASE**: Constants and environment variables
- **Prefixes**: Use meaningful prefixes (is, has, can, should)

### Code Organization
- **Single Responsibility**: One responsibility per class/function
- **Dependency Injection**: Use Angular's DI system
- **Imports**: Organize imports (Angular, third-party, local)
- **Exports**: Use barrel exports for clean imports
- **File Structure**: Follow Angular style guide structure

## Angular Standards

### Component Standards
```typescript
@Component({
  selector: 'app-feature-component',
  templateUrl: './feature-component.html',
  styleUrls: ['./feature-component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent implements OnInit, OnDestroy {
  // Properties
  // Constructor with DI
  // Lifecycle hooks
  // Public methods
  // Private methods
}
```

### Service Standards
```typescript
@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  // Private properties
  // Constructor
  // Public methods
  // Private methods
}
```

### Module Standards
```typescript
@NgModule({
  declarations: [...],
  imports: [...],
  exports: [...],
  providers: [...]
})
export class FeatureModule { }
```

## ng-alain Standards

### ST (Simple Table) Usage
- **Data Source**: Use proper data source configuration
- **Columns**: Define columns with proper types
- **Actions**: Implement consistent action patterns
- **Selection**: Handle row selection appropriately
- **Pagination**: Configure pagination settings

### SE (Search Engine) Usage
- **Schema**: Define search schema properly
- **Validation**: Implement search validation
- **Reset**: Handle search reset functionality
- **Submit**: Manage search submission

### ACL Integration
- **Permissions**: Define clear permission structure
- **Guards**: Implement route guards
- **Directives**: Use ACL directives in templates
- **Service**: Integrate ACL service properly

## Styling Standards

### Less Standards
- **Variables**: Use Less variables for consistency
- **Mixins**: Create reusable mixins
- **Nesting**: Proper CSS nesting (max 3 levels)
- **BEM**: Use BEM methodology for class names
- **Responsive**: Mobile-first responsive design

### Component Styles
- **Scoped Styles**: Use component-specific styles
- **Global Styles**: Minimize global style usage
- **Theme Variables**: Use ng-alain theme variables
- **Custom Properties**: CSS custom properties for dynamic values

## Testing Standards

### Unit Testing
- **Test Structure**: Arrange, Act, Assert pattern
- **Mocking**: Proper service and dependency mocking
- **Coverage**: Maintain >80% code coverage
- **Descriptive Names**: Clear test descriptions
- **Isolation**: Test components in isolation

### Component Testing
```typescript
describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Documentation Standards

### Code Comments
- **JSDoc**: Use JSDoc for public APIs
- **Complex Logic**: Comment complex business logic
- **TODO**: Mark temporary code with TODO comments
- **Deprecation**: Mark deprecated code clearly

### README Files
- **Project Overview**: Clear project description
- **Setup Instructions**: Step-by-step setup guide
- **Usage Examples**: Code examples and usage patterns
- **API Documentation**: Public API documentation

## Performance Standards

### Bundle Optimization
- **Tree Shaking**: Ensure unused code elimination
- **Lazy Loading**: Implement route-based lazy loading
- **Dynamic Imports**: Use dynamic imports for large libraries
- **Bundle Analysis**: Regular bundle size analysis

### Runtime Performance
- **OnPush Strategy**: Use OnPush change detection
- **TrackBy Functions**: Implement trackBy for *ngFor
- **Unsubscribe**: Proper subscription cleanup
- **Memory Leaks**: Prevent memory leaks

## Security Standards

### Input Validation
- **Form Validation**: Implement proper form validation
- **Sanitization**: Sanitize user inputs
- **Type Checking**: Runtime type validation
- **Error Handling**: Proper error handling and logging

### Authentication
- **Token Management**: Secure token handling
- **Route Guards**: Implement proper route protection
- **ACL Integration**: Use ng-alain ACL system
- **Session Management**: Proper session handling

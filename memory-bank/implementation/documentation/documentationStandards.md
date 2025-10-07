# Documentation Standards

## Documentation Structure

### Project Documentation
- **README.md**: Project overview and setup instructions
- **CONTRIBUTING.md**: Contribution guidelines
- **CHANGELOG.md**: Version history and changes
- **LICENSE**: Project license information
- **API.md**: API documentation

### Code Documentation
- **Inline Comments**: Explain complex logic
- **JSDoc**: Document public APIs and methods
- **Type Definitions**: Document interfaces and types
- **Examples**: Provide usage examples

## README.md Standards

### Required Sections
```markdown
# Project Title

Brief project description

## Features
- Key feature 1
- Key feature 2
- Key feature 3

## Prerequisites
- Node.js version requirements
- Package manager requirements
- System requirements

## Installation
```bash
# Installation commands
npm install
# or
yarn install
```

## Development
```bash
# Development server
npm start
# or
yarn start
```

## Building
```bash
# Production build
npm run build
# or
yarn build
```

## Testing
```bash
# Unit tests
npm test
# or
yarn test
```

## Contributing
See CONTRIBUTING.md for guidelines

## License
See LICENSE file
```

## API Documentation Standards

### JSDoc Format
```typescript
/**
 * Service for managing user data
 * @description Provides CRUD operations for user management
 * @example
 * ```typescript
 * constructor(private userService: UserService) {}
 * 
 * this.userService.getUsers().subscribe(users => {
 *   console.log(users);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Retrieves all users
   * @returns Observable<User[]> Array of users
   * @throws {HttpErrorResponse} When API request fails
   */
  getUsers(): Observable<User[]> {
    // Implementation
  }

  /**
   * Creates a new user
   * @param user - User data to create
   * @returns Observable<User> Created user
   */
  createUser(user: CreateUserRequest): Observable<User> {
    // Implementation
  }
}
```

### Interface Documentation
```typescript
/**
 * User entity interface
 * @interface User
 */
export interface User {
  /** Unique user identifier */
  id: string;
  /** User's full name */
  name: string;
  /** User's email address */
  email: string;
  /** User's role in the system */
  role: UserRole;
  /** Account creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}
```

## Component Documentation

### Component README Template
```markdown
# ComponentName

Brief component description

## Usage
```html
<app-component-name
  [inputProperty]="value"
  (outputEvent)="handler($event)">
</app-component-name>
```

## Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| inputProperty | string | '' | Description of property |

## Events
| Event | Type | Description |
|-------|------|-------------|
| outputEvent | EventEmitter<T> | Description of event |

## Examples
### Basic Usage
```html
<app-component-name></app-component-name>
```

### With Properties
```html
<app-component-name
  [inputProperty]="'custom value'"
  (outputEvent)="handleEvent($event)">
</app-component-name>
```
```

## Style Guide Documentation

### CSS/Less Documentation
```less
/**
 * Component styles for FeatureComponent
 * Uses BEM methodology for class naming
 */

// Variables
@component-padding: 16px;
@component-border-radius: 4px;

// Component styles
.feature-component {
  // Block styles
  padding: @component-padding;
  border-radius: @component-border-radius;

  // Element styles
  &__header {
    // Header element styles
  }

  &__content {
    // Content element styles
  }

  // Modifier styles
  &--large {
    // Large modifier styles
  }
}
```

## Testing Documentation

### Test Documentation Standards
```typescript
describe('FeatureComponent', () => {
  /**
   * Test suite for FeatureComponent
   * Tests component initialization, user interactions, and data handling
   */
  
  describe('Component Initialization', () => {
    it('should create component successfully', () => {
      // Test implementation
    });
  });

  describe('User Interactions', () => {
    it('should handle button click events', () => {
      // Test implementation
    });
  });

  describe('Data Handling', () => {
    it('should display data correctly', () => {
      // Test implementation
    });
  });
});
```

## Architecture Documentation

### System Architecture
```markdown
# System Architecture

## Overview
High-level system architecture description

## Components
### Core Components
- Component 1: Description
- Component 2: Description

### Feature Components
- Feature 1: Description
- Feature 2: Description

## Data Flow
```mermaid
graph TD
    A[User Input] --> B[Component]
    B --> C[Service]
    C --> D[API]
    D --> E[Response]
    E --> F[Update UI]
```

## Dependencies
- Angular 20.3.0
- ng-alain 20.0.2
- ng-zorro-antd 20.3.1
```

## Deployment Documentation

### Build Process
```markdown
# Build Process

## Development Build
```bash
ng build
```

## Production Build
```bash
ng build --configuration production
```

## Build Optimization
- Tree shaking enabled
- Minification enabled
- Source maps disabled in production
- Bundle analysis available

## Deployment Steps
1. Run production build
2. Deploy dist folder to web server
3. Configure server for Angular routing
4. Set up monitoring and logging
```

## Maintenance Documentation

### Update Procedures
```markdown
# Update Procedures

## Dependency Updates
1. Check for updates: `npm outdated`
2. Update packages: `npm update`
3. Test application: `npm test`
4. Build application: `npm run build`

## Angular Updates
1. Check Angular update guide
2. Run Angular update command
3. Fix breaking changes
4. Update dependencies
5. Test thoroughly
```

## Documentation Maintenance

### Regular Updates
- **Monthly**: Review and update README files
- **Release**: Update CHANGELOG.md
- **Feature**: Update API documentation
- **Bug Fix**: Update known issues section

### Documentation Review
- **Accuracy**: Verify all information is current
- **Completeness**: Ensure all features are documented
- **Clarity**: Check for clear and understandable language
- **Examples**: Verify all examples work correctly

## ng-alain Documentation Standards

### Module README Template
```markdown
# [Feature Name] Module

## 功能概述
[簡短描述功能模組的用途和主要功能]

## 目錄結構
```
src/app/routes/[feature]/
├── components/
│   ├── [feature]-list/
│   │   ├── [feature]-list.component.ts
│   │   ├── [feature]-list.component.html (可選)
│   │   └── [feature]-list.component.less (可選)
│   ├── [feature]-form/
│   └── [feature]-detail/
├── services/
│   └── [feature].service.ts
├── models/
│   └── [feature].model.ts
├── guards/
│   └── [feature]-permission.guard.ts
├── routes.ts
├── index.ts
└── README.md
```

## 使用方式
[代碼示例和基本使用方法]

## API 文檔
[API 說明和參數]

## 開發指南
[開發注意事項和最佳實踐]
```

### JSDoc Standards
```typescript
/**
 * 獲取組織列表
 * @description 根據查詢參數獲取組織列表，支援分頁、搜索和篩選
 * @param params 查詢參數（分頁、搜索、篩選）
 * @returns Observable<{data: Organization[]; total: number}>
 * @example
 * ```typescript
 * this.organizationService.getOrganizations({
 *   page: 1,
 *   pageSize: 10,
 *   search: 'test'
 * }).subscribe(result => {
 *   console.log(result.data);
 * });
 * ```
 */
getOrganizations(params?: OrganizationQueryParams): Observable<{data: Organization[]; total: number}> {
  return this.http.get('/api/organizations', params);
}
```

### Component Documentation Template
```markdown
# ComponentName

Brief component description

## Usage
```html
<app-component-name
  [inputProperty]="value"
  (outputEvent)="handler($event)">
</app-component-name>
```

## Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| inputProperty | string | '' | Description of property |

## Events
| Event | Type | Description |
|-------|------|-------------|
| outputEvent | EventEmitter<T> | Description of event |

## Examples
### Basic Usage
```html
<app-component-name></app-component-name>
```

### With Properties
```html
<app-component-name
  [inputProperty]="'custom value'"
  (outputEvent)="handleEvent($event)">
</app-component-name>
```
```

### Git Commit Standards
```
<type>(<scope>): <subject>

<body>

<footer>

Header: Mandatory, includes type, scope (optional), and subject.
  - Type: Must be one of:
    - build: Changes that affect the build system or external dependencies
    - ci: Changes to our CI configuration files and scripts
    - docs: Documentation only changes
    - feat: A new feature
    - fix: A bug fix
    - perf: A code change that improves performance
    - refactor: A code change that neither fixes a bug nor adds a feature
    - style: Changes that do not affect the meaning of the code
    - test: Adding missing tests or correcting existing tests
  - Subject: Succinct description of the change.
    - Use imperative, present tense: "change" not "changed" nor "changes"
    - Don't capitalize first letter
    - No dot (.) at the end

Body: Optional.
  - Use imperative, present tense: "change" not "changed" nor "changes".
  - Should include the motivation for the change and contrast this with previous behavior.

Footer: Optional.
  - Should contain any information about Breaking Changes.
  - Should reference GitHub issues that this commit Closes.
  - Breaking Changes: Start with `BREAKING CHANGE:` followed by a space or two newlines.

Examples:
  - docs(changelog): update change log to beta.5
  - fix(release): need to depend on latest rxjs and zone.js
```

### API Documentation Standards
```typescript
/**
 * Service for managing user data
 * @description Provides CRUD operations for user management
 * @example
 * ```typescript
 * constructor(private userService: UserService) {}
 * 
 * this.userService.getUsers().subscribe(users => {
 *   console.log(users);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Retrieves all users
   * @returns Observable<User[]> Array of users
   * @throws {HttpErrorResponse} When API request fails
   */
  getUsers(): Observable<User[]> {
    // Implementation
  }

  /**
   * Creates a new user
   * @param user - User data to create
   * @returns Observable<User> Created user
   */
  createUser(user: CreateUserRequest): Observable<User> {
    // Implementation
  }
}
```

### Interface Documentation Standards
```typescript
/**
 * User entity interface
 * @interface User
 */
export interface User {
  /** Unique user identifier */
  id: string;
  /** User's full name */
  name: string;
  /** User's email address */
  email: string;
  /** User's role in the system */
  role: UserRole;
  /** Account creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}
```

### Style Guide Documentation
```less
/**
 * Component styles for FeatureComponent
 * Uses BEM methodology for class naming
 */

// Variables
@component-padding: 16px;
@component-border-radius: 4px;

// Component styles
.feature-component {
  // Block styles
  padding: @component-padding;
  border-radius: @component-border-radius;

  // Element styles
  &__header {
    // Header element styles
  }

  &__content {
    // Content element styles
  }

  // Modifier styles
  &--large {
    // Large modifier styles
  }
}
```

### Architecture Documentation
```markdown
# System Architecture

## Overview
High-level system architecture description

## Components
### Core Components
- Component 1: Description
- Component 2: Description

### Feature Components
- Feature 1: Description
- Feature 2: Description

## Data Flow
```mermaid
graph TD
    A[User Input] --> B[Component]
    B --> C[Service]
    C --> D[API]
    D --> E[Response]
    E --> F[Update UI]
```

## Dependencies
- Angular 20.3.0
- ng-alain 20.0.2
- ng-zorro-antd 20.3.1
```

### Deployment Documentation
```markdown
# Build Process

## Development Build
```bash
ng build
```

## Production Build
```bash
ng build --configuration production
```

## Build Optimization
- Tree shaking enabled
- Minification enabled
- Source maps disabled in production
- Bundle analysis available

## Deployment Steps
1. Run production build
2. Deploy dist folder to web server
3. Configure server for Angular routing
4. Set up monitoring and logging
```

### Update Procedures Documentation
```markdown
# Update Procedures

## Dependency Updates
1. Check for updates: `npm outdated`
2. Update packages: `npm update`
3. Test application: `npm test`
4. Build application: `npm run build`

## Angular Updates
1. Check Angular update guide
2. Run Angular update command
3. Fix breaking changes
4. Update dependencies
5. Test thoroughly
```

### Code Review Checklist Documentation
```markdown
# Code Review Checklist

## Architecture
- [ ] 組件是 standalone
- [ ] 使用 loadComponent 懶加載
- [ ] 路由有適當的守衛
- [ ] 服務使用 providedIn: 'root'

## Performance
- [ ] 組件使用 OnPush
- [ ] @for 循環有 track
- [ ] 避免在模板中調用函數
- [ ] 大型列表考慮虛擬滾動

## Type Safety
- [ ] 所有參數有類型定義
- [ ] 避免使用 any
- [ ] Observable 返回類型明確

## User Experience
- [ ] 有載入狀態
- [ ] 有空狀態處理
- [ ] 錯誤有用戶通知
- [ ] 響應式設計（手機適配）

## Code Quality
- [ ] 通過 ESLint
- [ ] 通過 Stylelint
- [ ] 有適當的註釋
- [ ] 功能模組有 README
```
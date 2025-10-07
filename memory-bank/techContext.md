# Memory Bank: Technical Context

## Development Environment
- **Operating System**: Windows 10 (10.0.26100)
- **Shell**: PowerShell
- **Package Manager**: Yarn 4.9.2
- **Node.js**: Compatible with Node 22.18.0 (recommended)

## Build Configuration
- **Angular CLI**: 20.3.1
- **TypeScript**: 5.9.2
- **Build Memory**: --max_old_space_size=8000 (8GB allocation)
- **Source Maps**: Enabled for development and analysis
- **Bundle Analysis**: source-map-explorer integration

## Development Scripts
```json
{
  "start": "ng s -o",
  "hmr": "ng s -o --hmr",
  "build": "npm run ng-high-memory build",
  "analyze": "npm run ng-high-memory build -- --source-map",
  "lint": "npm run lint:ts && npm run lint:style",
  "test": "ng test --watch",
  "e2e": "ng e2e"
}
```

## Code Quality Tools
- **ESLint**: TypeScript and Angular specific rules
- **Stylelint**: Less file linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Pre-commit linting

## Theme System
- **Theme Engine**: ng-alain-plugin-theme
- **Color Generation**: npm run color-less
- **Theme CSS**: npm run theme
- **Icon Generation**: npm run icon

## Testing Framework
- **Unit Tests**: Jasmine + Karma
- **E2E Tests**: Protractor
- **Coverage**: Code coverage reporting available
- **Mock Data**: @delon/mock integration

## Performance Optimization
- **Lazy Loading**: Angular Router lazy loading
- **Tree Shaking**: Automatic unused code elimination
- **Bundle Analysis**: Source map explorer for optimization
- **Memory Management**: High memory allocation for large builds

## Development Workflow
1. **Development**: ng serve with HMR support
2. **Testing**: Continuous testing with watch mode
3. **Linting**: Pre-commit and manual linting
4. **Building**: High memory build process
5. **Analysis**: Bundle size analysis and optimization

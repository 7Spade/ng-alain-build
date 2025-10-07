# 開發原則快速參考

> 核心開發標準與最佳實踐

## 🎯 核心原則

| 原則 | 說明 | 實踐 |
|------|------|------|
| **Standalone First** | 100% standalone 組件 | standalone: true |
| **OnPush Strategy** | 強制 OnPush 變更檢測 | ChangeDetectionStrategy.OnPush |
| **inject() DI** | 函數式依賴注入 | inject(Service) |
| **Native Control Flow** | 原生控制流語法 | @if, @for, @switch |
| **Type Safety** | TypeScript 嚴格模式 | strict: true |

## 📐 組件開發

### 標準模板
```typescript
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, NzButtonModule],
  template: `
    <div class="container">
      @if (loading) {
        <nz-spin nzSize="large" />
      } @else {
        @for (item of items; track item.id) {
          <nz-card>{{ item.name }}</nz-card>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent {
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
}
```

### 組件檢查清單
- [ ] 使用 standalone: true
- [ ] 使用 OnPush 變更檢測
- [ ] @for 循環有 track
- [ ] 使用 inject() 函數
- [ ] 避免在模板中調用函數
- [ ] 有載入狀態和空狀態處理

## 🔧 服務開發

### RESTful 模式
```typescript
@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly http = inject(_HttpClient);
  private readonly API_BASE = '/api/feature';
  
  getAll(): Observable<Item[]> {
    return this.http.get(this.API_BASE);
  }
  
  create(item: Partial<Item>): Observable<Item> {
    return this.http.post(this.API_BASE, item);
  }
  
  update(id: string, item: Partial<Item>): Observable<Item> {
    return this.http.put(`${this.API_BASE}/${id}`, item);
  }
}
```

### 服務檢查清單
- [ ] 使用 providedIn: 'root'
- [ ] 使用 inject() 函數
- [ ] 正確處理錯誤
- [ ] 使用 RxJS 操作符
- [ ] 強類型接口定義

## 🛡️ 守衛開發

### 函數式守衛模板
```typescript
export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
```

## 🛣️ 路由配置

### 懶加載模式
```typescript
export const routes: Routes = [
  {
    path: 'feature',
    loadComponent: () => import('./feature.component').then(m => m.FeatureComponent),
    canActivate: [authGuard]
  }
];
```

## 🎨 樣式開發

### Less 標準
```less
// 變數定義
@primary-color: #1890ff;
@spacing-unit: 8px;

// BEM 命名
.feature {
  padding: @spacing-unit * 2;
  
  &__header {
    font-size: 18px;
    font-weight: bold;
  }
  
  &--large {
    padding: @spacing-unit * 3;
  }
}
```

## 🧪 測試標準

### AAA 模式
```typescript
describe('FeatureService', () => {
  it('should get data', () => {
    // Arrange
    const mockData = [{ id: 1, name: 'Test' }];
    
    // Act
    service.getData().subscribe(data => {
      // Assert
      expect(data).toEqual(mockData);
    });
  });
});
```

### 測試覆蓋率
| 類型 | 覆蓋率 | 說明 |
|------|--------|------|
| Services | 80% | 業務邏輯測試 |
| Components | 60% | UI 組件測試 |
| Guards | 100% | 安全邏輯測試 |

## 📚 文檔標準

### JSDoc 模板
```typescript
/**
 * 獲取用戶列表
 * @param params 查詢參數
 * @returns Observable<用戶列表>
 */
getUsers(params?: QueryParams): Observable<User[]> {
  return this.http.get('/api/users', params);
}
```

## 🔄 Git Workflow

### Commit 格式
```
<type>(<scope>): <subject>

類型: feat, fix, docs, style, refactor, perf, test
範例: feat(user): add user management feature
```

## 🚀 性能優化

### 優化檢查清單
- [ ] OnPush 變更檢測
- [ ] TrackBy 函數
- [ ] 懶加載路由
- [ ] 正確清理訂閱
- [ ] 避免記憶體洩漏

### 性能基準
| 指標 | 目標值 | 說明 |
|------|--------|------|
| Initial Bundle | 1.8 MB | 懶加載後 |
| Time to Interactive | 1.2s | 首次互動時間 |
| Change Detection | OnPush | 40-60% 提升 |

## 🔒 安全原則

### 安全檢查清單
- [ ] 驗證用戶輸入
- [ ] 防止 XSS 攻擊
- [ ] 實現適當的認證
- [ ] 保護敏感數據
- [ ] 使用 HTTPS

## 📋 代碼審查清單

### 通用檢查
- [ ] 代碼符合專案標準
- [ ] 通過所有測試
- [ ] 文檔完整且準確
- [ ] 性能考慮適當
- [ ] 安全性檢查通過
- [ ] 無重複代碼

### Angular 特定檢查
- [ ] 組件是 standalone
- [ ] 使用 OnPush 變更檢測
- [ ] @for 循環有 track
- [ ] 使用 inject() 函數
- [ ] 使用原生控制流
- [ ] 通過 ESLint 和 Stylelint

## 🎯 ng-alain 特定原則

### 組件使用
| 組件 | 用途 | 關鍵配置 |
|------|------|----------|
| ST | 數據表格 | 列定義, 操作, 分頁 |
| SE | 搜索引擎 | Schema 定義, 驗證 |
| ACL | 權限控制 | 角色定義, 守衛 |

### 路徑別名
| 別名 | 路徑 | 用途 |
|------|------|------|
| @shared | src/app/shared/ | 共享組件 |
| @core | src/app/core/ | 核心服務 |
| @env/* | src/environments/* | 環境配置 |

### 國際化
```html
<!-- 使用 i18n 管道 -->
<h2>{{ 'feature.title' | i18n }}</h2>
<button>{{ 'common.save' | i18n }}</button>
```

## 🔑 快速參考

### 常用命令
```bash
npm start          # 開發服務器
npm run build      # 生產建置
npm run test       # 運行測試
npm run lint       # 代碼檢查
npm run analyze    # Bundle 分析
```

### 常用導入
```typescript
// Angular 核心
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// ng-alain
import { _HttpClient } from '@delon/theme';
import { STColumn } from '@delon/abc/st';

// ng-zorro
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
```
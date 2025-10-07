# 📋 ng-alain Lint 錯誤報告

> 自動生成的程式碼品質檢查報告

**生成時間**: 2025-10-07 16:43:26

## 📊 檢查摘要

| 檢查類型 | 狀態 | 結果 |
|---------|------|------|
| TypeScript (ESLint) | ❌ 發現問題 | ✖ 155 problem |
| Style (Stylelint) | ❌ 發現問題 | 無錯誤 |

## 🔍 詳細報告

### TypeScript Lint (ESLint)



```
C:\Users\user\Downloads\ng-alain-build\_mock\_api.ts
   35:35  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   36:15  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   80:23  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  145:27  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\_mock\_chart.ts
    6:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   17:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   26:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   33:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  120:20  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  127:25  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  164:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  165:22  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  172:32  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\_mock\_project.ts
  216:34  error  'req' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\user\Downloads\ng-alain-build\_mock\_rule.ts
   3:13  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  26:26  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  26:32  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\_mock\_user.ts
   3:13  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  27:26  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  27:55  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  40:38  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\e2e\src\app.po.ts
  4:25  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  5:52  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\scripts\generate-tree.ts
   97:12  error    'error' is defined but never used         @typescript-eslint/no-unused-vars
  204:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  219:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\app.config.ts
   77:3   warning  `provideAnimations` is deprecated. 20.2 Use `animate.enter` or `animate.leave` instead. Intent to remove in v23                                                                                                                                                                                                                                                                                                                                                                                                    @typescript-eslint/no-deprecated
  105:25  warning  `getVertexAI` is deprecated. Use the new {@link getAIgetAI()} instead. The Vertex AI in Firebase SDK has been
replaced with the Firebase AI SDK to accommodate the evolving set of supported features and
services. For migration details, see the {@link https://firebase.google.com/docs/vertex-ai/migrate-to-latest-sdk migration guide}.

Returns a {@link VertexAI} instance for the given app, configured to use the
Vertex AI Gemini API. This instance will be
configured to use the Vertex AI Gemini API  @typescript-eslint/no-deprecated

C:\Users\user\Downloads\ng-alain-build\src\app\auth\landing\landing.component.ts
  16:15  error  Prefer using the inject() function over constructor parameter injection. Use Angular's migration schematic to automatically refactor: ng generate @angular/core:inject  @angular-eslint/prefer-inject

C:\Users\user\Downloads\ng-alain-build\src\app\auth\login\login.component.ts
   2:10  error  'ChangeDetectionStrategy' is defined but never used  @typescript-eslint/no-unused-vars
  13:10  error  'NzIconModule' is defined but never used             @typescript-eslint/no-unused-vars
  98:3   error  Lifecycle methods should not be empty                @angular-eslint/no-empty-lifecycle-method

C:\Users\user\Downloads\ng-alain-build\src\app\auth\register\register.component.ts
   12:10  error  'NzGridModule' is defined but never used    @typescript-eslint/no-unused-vars
   16:10  error  'NzSelectModule' is defined but never used  @typescript-eslint/no-unused-vars
  115:3   error  Lifecycle methods should not be empty       @angular-eslint/no-empty-lifecycle-method

C:\Users\user\Downloads\ng-alain-build\src\app\core\net\default.interceptor.ts
  10:80   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  10:119  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\core\net\helper.ts
  9:9  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\core\net\organization.interceptor.ts
  18:77  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\core\net\refresh-token.ts
   9:36   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   9:63   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  16:61   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  16:80   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  25:62   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  33:92   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  33:131  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\core\services\organization-context\organization-context.service.ts
   18:3   error    'ORGANIZATION_ROLE_PERMISSIONS' is defined but never used                                                                                                              @typescript-eslint/no-unused-vars
   60:69  warning  `toPromise` is deprecated. Replaced with {@link firstValueFrom } and {@link lastValueFrom }. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise  @typescript-eslint/no-deprecated
  183:74  warning  `toPromise` is deprecated. Replaced with {@link firstValueFrom } and {@link lastValueFrom }. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise  @typescript-eslint/no-deprecated
  208:77  warning  `toPromise` is deprecated. Replaced with {@link firstValueFrom } and {@link lastValueFrom }. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise  @typescript-eslint/no-deprecated

C:\Users\user\Downloads\ng-alain-build\src\app\core\services\tab\simple-reuse-strategy.ts
  3:10  error  'takeUntilDestroyed' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\user\Downloads\ng-alain-build\src\app\core\startup\startup.service.ts
  7:39  error  'map' is defined but never used   @typescript-eslint/no-unused-vars
  7:55  error  'from' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\user\Downloads\ng-alain-build\src\app\examples\delon-features\form-demo\form.component.ts
  12:11  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\delon-features\guard-demo\guard.component.ts
  17:15  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\delon-features\print-demo\print.component.ts
  28:8   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  43:12  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\delon-features\util-demo\util.component.ts
  20:13  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\delon-features\xlsx-demo\xlsx.component.ts
  15:9  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\delon-features\zip-demo\zip.component.ts
  18:9   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  35:24  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\pro-templates\account\account-center\center.component.ts
  21:9   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  22:11  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\pro-templates\account\account-center\my-applications-tab\applications.component.ts
  19:9  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\pro-templates\account\account-center\my-projects-tab\projects.component.ts
  20:9  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\pro-templates\form-templates\step-form\step1.component.ts
  32:39  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\pro-templates\list-templates\article-list\articles.component.ts
  24:9  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\pro-templates\list-templates\basic-list\edit\edit.component.ts
  16:11  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  46:15  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\pro-templates\list-templates\project-list\projects.component.ts
  26:9  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\examples\pro-templates\list-templates\table-list\table-list.component.ts
  37:9  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\dashboard\dashboard-analysis\analysis.component.ts
  45:9   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  89:17  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  98:38  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\dashboard\dashboard-monitor\monitor.component.ts
  34:9   warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  49:16  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  51:16  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  61:89  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  61:94  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  75:23  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  95:21  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\dashboard\dashboard-v1\v1.component.ts
  65:13  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  66:15  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  67:22  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\dashboard\dashboard-workplace\workplace.component.ts
  21:11  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  22:15  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  23:15  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  87:38  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  87:43  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  87:48  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  90:49  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\components\department-list\department-list.component.ts
   32:10  error  'Department' is defined but never used  @typescript-eslint/no-unused-vars
  144:7   error  'parentId' is defined but never used    @typescript-eslint/no-unused-vars
  149:8   error  'id' is defined but never used          @typescript-eslint/no-unused-vars

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\components\employee-list\employee-list.component.ts
    9:3   error  'TreeNodeInterface' is defined but never used  @typescript-eslint/no-unused-vars
   26:10  error  'NzSwitchModule' is defined but never used     @typescript-eslint/no-unused-vars
  143:8   error  'id' is defined but never used                 @typescript-eslint/no-unused-vars

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\components\organization-form\organization-form.component.ts
  64:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\components\role-management\role-management.component.ts
  136:8   error  'id' is defined but never used  @typescript-eslint/no-unused-vars
  141:18  error  'id' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\guards\organization.guard.ts
   7:10  error  'inject' is defined but never used                 @typescript-eslint/no-unused-vars
   9:10  error  'Router' is defined but never used                 @typescript-eslint/no-unused-vars
  10:10  error  'ACLService' is defined but never used             @typescript-eslint/no-unused-vars
  11:10  error  'NzNotificationService' is defined but never used  @typescript-eslint/no-unused-vars
  18:50  error  'route' is defined but never used                  @typescript-eslint/no-unused-vars
  18:57  error  'state' is defined but never used                  @typescript-eslint/no-unused-vars
  49:54  error  'route' is defined but never used                  @typescript-eslint/no-unused-vars
  49:61  error  'state' is defined but never used                  @typescript-eslint/no-unused-vars
  60:54  error  'route' is defined but never used                  @typescript-eslint/no-unused-vars
  60:61  error  'state' is defined but never used                  @typescript-eslint/no-unused-vars
  71:52  error  'route' is defined but never used                  @typescript-eslint/no-unused-vars
  71:59  error  'state' is defined but never used                  @typescript-eslint/no-unused-vars
  82:48  error  'route' is defined but never used                  @typescript-eslint/no-unused-vars
  82:55  error  'state' is defined but never used                  @typescript-eslint/no-unused-vars

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\models\common.model.ts
   27:28  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  121:12  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  152:10  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\routes.ts
  10:10  error  'organizationGuard' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\services\organization.service.ts
  11:10  error    'map' is defined but never used           @typescript-eslint/no-unused-vars
  37:29  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  58:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\services\user-organization.service.ts
   41:21  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   49:26  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   53:35  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   88:57  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   95:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  102:26  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  123:33  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  125:26  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\components\member-list\member-list.component.ts
  3:1  error  There should be no empty line within import group  import/order

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\components\project-dashboard\project-dashboard.component.ts
  10:1  error  There should be no empty line within import group  import/order

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\components\project-files\project-files.component.ts
    4:1   error  There should be no empty line within import group  import/order
   18:40  error  'NzUploadChangeParam' is defined but never used    @typescript-eslint/no-unused-vars
  172:14  error  'err' is defined but never used                    @typescript-eslint/no-unused-vars

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\components\project-form\project-form.component.ts
  3:1  error  There should be no empty line within import group  import/order

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\components\project-list\project-list.component.ts
  4:1   error  There should be no empty line within import group  import/order
  7:10  error  'PageHeaderComponent' is defined but never used    @typescript-eslint/no-unused-vars
  7:37  error  '@shared' imported multiple times                  import/no-duplicates
  8:31  error  '@shared' imported multiple times                  import/no-duplicates

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\components\project-overview\project-overview.component.ts
  3:1  error  There should be no empty line within import group  import/order

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\components\project-settings\project-settings.component.ts
  4:1  error  There should be no empty line within import group  import/order

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\models\project-activity.model.ts
  31:29  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\services\project-file.service.ts
   7:33  error  'HttpEventType' is defined but never used  @typescript-eslint/no-unused-vars
  10:10  error  'map' is defined but never used            @typescript-eslint/no-unused-vars

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\services\project.service.ts
  120:26  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\layout\basic-layout\widgets\org-switcher.component.ts
  24:3  error  'ORGANIZATION_ROLE_LABELS' is defined but never used  @typescript-eslint/no-unused-vars
  25:3  error  'ORGANIZATION_ROLE_COLORS' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\user\Downloads\ng-alain-build\src\app\layout\passport-layout\passport.component.ts
  57:25  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\shared\directives\auth.directive.ts
  30:44  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\shared\directives\screen-less-hidden.directive.ts
  30:44  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\shared\pipes\map.pipe.ts
  121:9  error  Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment

C:\Users\user\Downloads\ng-alain-build\src\app\shared\shared-zorro.module.ts
  38:3  warning  `NzToolTipModule` is deprecated. Use {@link NzTooltipModule} instead.
This will be removed in v21.0.0  @typescript-eslint/no-deprecated

C:\Users\user\Downloads\ng-alain-build\src\app\shared\utils\tree-table-tools.ts
  84:11  error  Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions

C:\Users\user\Downloads\ng-alain-build\src\app\system\extras\poi\edit\edit.component.ts
  17:6  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\system\extras\settings\settings.component.ts
  32:22  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

✖ 155 problems (55 errors, 100 warnings)
```

### Style Lint (Stylelint)



```
NoFilesFoundError: No files matching the pattern "'src/**/*.less'" were found.
    at standalone (file:///C:/Users/user/Downloads/ng-alain-build/node_modules/stylelint/lib/standalone.mjs:302:43)
```

## 💡 建議修復步驟

### 自動修復
```bash
# 自動修復 TypeScript 問題
npm run lint:ts

# 自動修復 Style 問題
npm run lint:style
```

### 手動檢查
如果自動修復無法解決所有問題，請：
1. 檢查上述詳細報告中的錯誤訊息
2. 根據 ESLint/Stylelint 規則進行手動修正
3. 參考 Memory Bank 中的程式碼規範文件

## 📚 相關文件

- [程式碼規範](./implementation/code/codeStandards.md)
- [ESLint 配置](../eslint.config.mjs)
- [Stylelint 配置](../stylelint.config.mjs)

---

*Generated by ng-alain Structure Generator - Lint Report Module*

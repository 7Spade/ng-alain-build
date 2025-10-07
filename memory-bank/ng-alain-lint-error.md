# 📋 ng-alain Lint 錯誤報告

> 自動生成的程式碼品質檢查報告

**生成時間**: 2025-10-07 17:23:51

## 📊 檢查摘要

| 檢查類型 | 狀態 | 結果 |
|---------|------|------|
| TypeScript (ESLint) | ❌ 發現問題 | ✖ 2700 problem |
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

C:\Users\user\Downloads\ng-alain-build\src\app\app.config.ts
   44:1   error    `./core/services/auto-refresh.service` import should occur before import of `./core/services/tab/simple-reuse-strategy`                                                                                                                                                                                                                                                                                                                                                                                            import/order
   79:32  error    Delete `·`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         prettier/prettier
   84:3   warning  `provideAnimations` is deprecated. 20.2 Use `animate.enter` or `animate.leave` instead. Intent to remove in v23                                                                                                                                                                                                                                                                                                                                                                                                    @typescript-eslint/no-deprecated
  112:25  warning  `getVertexAI` is deprecated. Use the new {@link getAIgetAI()} instead. The Vertex AI in Firebase SDK has been
replaced with the Firebase AI SDK to accommodate the evolving set of supported features and
services. For migration details, see the {@link https://firebase.google.com/docs/vertex-ai/migrate-to-latest-sdk migration guide}.

Returns a {@link VertexAI} instance for the given app, configured to use the
Vertex AI Gemini API. This instance will be
configured to use the Vertex AI Gemini API  @typescript-eslint/no-deprecated
  121:1   error    Delete `··`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\auth\callback\callback.component.ts
    1:59  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
    2:58  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
    3:1   error  `@angular/common` import should occur before import of `@angular/core`                                                                                                                                 import/order
    3:48  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
    4:76  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
    5:1   error  `@core` import should occur before import of `@core/services/firebase-auth.service`                                                                                                                    import/order
    5:40  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
    6:51  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
    7:1   error  `ng-zorro-antd/alert` import should occur before import of `ng-zorro-antd/spin`                                                                                                                        import/order
    7:53  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
    8:1   error  `ng-zorro-antd/result` import should occur before import of `ng-zorro-antd/spin`                                                                                                                       import/order
    8:55  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
    9:1   error  `ng-zorro-antd/button` import should occur before import of `ng-zorro-antd/spin`                                                                                                                       import/order
    9:55  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   10:39  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   11:1   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   12:4   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   13:19  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   14:31  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   15:4   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   16:13  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   17:28  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   18:14  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   19:37  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   20:22  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   21:55  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   22:43  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   23:19  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   24:8   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   25:1   error  Delete `······␍`                                                                                                                                                                                       prettier/prettier
   26:20  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   27:19  error  Replace `␍⏎··········nzStatus="error"␍⏎··········nzTitle="登入失敗"␍⏎··········[nzSubTitle]="error">␍` with `·nzStatus="error"·nzTitle="登入失敗"·[nzSubTitle]="error">`                                       prettier/prettier
   31:32  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   32:70  error  Replace `␍⏎··············返回登入頁␍⏎············</button>␍` with `·返回登入頁·</button>`                                                                                                                        prettier/prettier
   35:17  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   36:21  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   37:8   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   38:11  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   39:5   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   40:12  error  Replace ``␍` with `⏎····``                                                                                                                                                                             prettier/prettier
   41:5   error  Replace `.callback-container·{␍` with `··.callback-container·{`                                                                                                                                        prettier/prettier
   42:1   error  Replace `······display:·flex;␍` with `········display:·flex;`                                                                                                                                          prettier/prettier
   43:1   error  Replace `······justify-content:·center;␍` with `········justify-content:·center;`                                                                                                                      prettier/prettier
   44:7   error  Replace `align-items:·center;␍` with `··align-items:·center;`                                                                                                                                          prettier/prettier
   45:1   error  Replace `······min-height:·100vh;␍` with `········min-height:·100vh;`                                                                                                                                  prettier/prettier
   46:1   error  Replace `······background:·#f0f2f5;␍` with `········background:·#f0f2f5;`                                                                                                                              prettier/prettier
   47:1   error  Replace `····}␍` with `······}`                                                                                                                                                                        prettier/prettier
   48:1   error  Replace `····␍⏎····.spin-content·{␍` with `⏎······.spin-content·{`                                                                                                                                     prettier/prettier
   50:1   error  Replace `······min-height:·200px;␍` with `········min-height:·200px;`                                                                                                                                  prettier/prettier
   51:1   error  Replace `······min-width:·200px;␍` with `········min-width:·200px;`                                                                                                                                    prettier/prettier
   52:5   error  Replace `}␍` with `··}⏎`                                                                                                                                                                               prettier/prettier
   53:5   error  Replace `␍⏎····:host·::ng-deep·.ant-result·{␍` with `··:host·::ng-deep·.ant-result·{`                                                                                                                  prettier/prettier
   55:1   error  Replace `······padding:·48px·32px;␍` with `········padding:·48px·32px;`                                                                                                                                prettier/prettier
   56:1   error  Replace `····}␍` with `······}`                                                                                                                                                                        prettier/prettier
   57:1   error  Replace `··`],␍` with `····`⏎··],`                                                                                                                                                                     prettier/prettier
   58:20  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   59:13  error  Replace `␍⏎····CommonModule,␍⏎····NzSpinModule,␍⏎····NzAlertModule,␍⏎····NzResultModule,␍⏎····NzButtonModule␍⏎··]␍` with `CommonModule,·NzSpinModule,·NzAlertModule,·NzResultModule,·NzButtonModule]`  prettier/prettier
   66:3   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   67:51  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   68:35  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   69:42  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   70:54  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   71:47  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   72:1   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   73:18  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   74:14  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   75:1   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   76:21  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   77:27  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   78:4   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   79:1   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   80:6   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   81:22  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   82:6   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   83:35  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   84:53  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   85:1   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   86:40  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   87:19  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   88:34  error  Replace `␍⏎······take(1)␍⏎····).subscribe({␍` with `take(1)).subscribe({`                                                                                                                              prettier/prettier
   91:13  error  Replace `(user)·=>·{␍` with `user·=>·{`                                                                                                                                                                prettier/prettier
   92:20  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   93:55  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   94:36  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   95:17  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   96:49  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   97:37  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   98:32  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
   99:1   error  Delete `··········␍`                                                                                                                                                                                   prettier/prettier
  100:26  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  101:52  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  102:10  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  103:9   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  104:14  error  Replace `(err)·=>·{␍` with `err·=>·{`                                                                                                                                                                  prettier/prettier
  105:52  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  106:48  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  107:30  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  108:1   error  Delete `········␍`                                                                                                                                                                                     prettier/prettier
  109:24  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  110:50  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  111:8   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  112:8   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  113:4   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  114:1   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  115:6   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  116:12  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  117:6   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  118:38  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  119:36  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  120:82  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  121:1   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  122:16  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  123:39  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  124:20  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  125:59  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  126:45  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  127:9   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  128:14  error  Replace `(err)·=>·{␍` with `err·=>·{`                                                                                                                                                                  prettier/prettier
  129:52  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  130:24  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  131:49  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  132:8   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  133:8   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  134:4   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  135:1   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  136:6   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  137:11  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  138:6   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  139:22  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  140:46  error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  141:4   error  Delete `␍`                                                                                                                                                                                             prettier/prettier
  142:2   error  Delete `␍⏎␍`                                                                                                                                                                                           prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\auth\login\login.component.ts
   5:32  error  '@core' imported multiple times        import/no-duplicates
   6:37  error  '@core' imported multiple times        import/no-duplicates
  47:1   error  Delete `··`                            prettier/prettier
  48:3   error  Lifecycle methods should not be empty  @angular-eslint/no-empty-lifecycle-method
  59:1   error  Delete `··`                            prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\core\guards\firebase-auth.guard.ts
   1:40   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
   2:102  error  Delete `␍`                                                                                                                                                                                            prettier/prettier
   3:1    error  `@angular/fire/auth` import should occur before import of `@angular/router`                                                                                                                           import/order
   3:49   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
   4:49   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
   5:1    error  `rxjs` import should occur before import of `rxjs/operators`                                                                                                                                          import/order
   5:35   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
   6:1    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
   7:4    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
   8:17   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
   9:23   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  10:3    error  Delete `·␍`                                                                                                                                                                                           prettier/prettier
  11:12   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  12:17   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  13:28   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  14:7    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  15:26   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  16:38   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  17:40   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  18:7    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  19:6    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  20:7    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  21:4    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  22:50   error  Replace `␍⏎··route:·ActivatedRouteSnapshot,␍⏎··state:·RouterStateSnapshot␍⏎):·Observable<boolean>·=>·{␍` with `route:·ActivatedRouteSnapshot,·state:·RouterStateSnapshot):·Observable<boolean>·=>·{`  prettier/prettier
  26:29   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  27:33   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  28:1    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  29:26   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  30:13   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  31:25   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  32:29   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  33:30   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  34:59   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  35:1    error  Delete `········␍`                                                                                                                                                                                    prettier/prettier
  36:26   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  37:43   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  38:47   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  39:12   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  40:8    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  41:7    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  42:5    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  43:3    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  44:1    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  45:4    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  46:17   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  47:28   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  48:3    error  Delete `·␍`                                                                                                                                                                                           prettier/prettier
  49:12   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  50:17   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  51:28   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  52:7    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  53:22   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  54:34   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  55:41   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  56:7    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  57:6    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  58:7    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  59:4    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  60:51   error  Replace `␍⏎··route:·ActivatedRouteSnapshot,␍⏎··state:·RouterStateSnapshot␍⏎):·Observable<boolean>·=>·{␍` with `route:·ActivatedRouteSnapshot,·state:·RouterStateSnapshot):·Observable<boolean>·=>·{`  prettier/prettier
  61:3    error  'route' is defined but never used. Allowed unused args must match /^_/u                                                                                                                               @typescript-eslint/no-unused-vars
  62:3    error  'state' is defined but never used. Allowed unused args must match /^_/u                                                                                                                               @typescript-eslint/no-unused-vars
  64:29   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  65:33   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  66:1    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  67:26   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  68:13   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  69:24   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  70:21   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  71:22   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  72:59   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  73:32   error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  74:8    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  75:7    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  76:5    error  Delete `␍`                                                                                                                                                                                            prettier/prettier
  77:3    error  Delete `␍⏎␍`                                                                                                                                                                                          prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\core\guards\permission.guard.ts
    1:40   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
    2:102  error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
    3:1    error  `@angular/fire/auth` import should occur before import of `@angular/router`                                                                                                                                                                    import/order
    3:43   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
    4:15   error  'take' is defined but never used. Allowed unused vars must match /^_/u                                                                                                                                                                         @typescript-eslint/no-unused-vars
    4:26   error  'switchMap' is defined but never used. Allowed unused vars must match /^_/u                                                                                                                                                                    @typescript-eslint/no-unused-vars
    4:60   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
    5:1    error  `rxjs` import should occur before import of `rxjs/operators`                                                                                                                                                                                   import/order
    5:45   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
    6:1    error  `ng-zorro-antd/message` import should occur before import of `rxjs/operators`                                                                                                                                                                  import/order
    6:58   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
    7:1    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
    8:4    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
    9:12   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   10:28   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   11:3    error  Delete `·␍`                                                                                                                                                                                                                                    prettier/prettier
   12:37   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   13:48   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   14:3    error  Delete `·␍`                                                                                                                                                                                                                                    prettier/prettier
   15:12   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   16:17   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   17:28   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   18:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   19:22   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   20:34   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   21:59   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   22:8    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   23:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   24:22   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   25:34   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   26:82   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   27:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   28:6    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   29:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   30:4    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   31:39   error  Replace `␍⏎··requiredPermissions:·string[],␍⏎··requireAll:·boolean·=·false␍⏎):·CanActivateFn·{␍` with `requiredPermissions:·string[],·requireAll:·boolean·=·false):·CanActivateFn·{`                                                           prettier/prettier
   33:3    error  Type boolean trivially inferred from a boolean literal, remove type annotation                                                                                                                                                                 @typescript-eslint/no-inferrable-types
   35:95   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   36:31   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   37:35   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   38:46   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   39:1    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   40:17   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   41:29   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   42:54   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   43:41   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   44:45   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   45:10   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   46:24   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   47:6    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   48:1    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   49:12   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   50:59   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   51:22   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   52:82   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   53:1    error  Delete `········␍`                                                                                                                                                                                                                             prettier/prettier
   54:21   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   55:41   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   56:72   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   57:72   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   58:1    error  Delete `········␍`                                                                                                                                                                                                                             prettier/prettier
   59:30   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   60:10   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   61:29   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   62:30   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   63:73   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   64:39   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   65:34   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   66:10   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   67:9    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   68:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   69:5    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   70:2    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   71:1    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   72:4    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   73:12   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   74:15   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   75:3    error  Delete `·␍`                                                                                                                                                                                                                                    prettier/prettier
   76:31   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   77:48   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   78:3    error  Delete `·␍`                                                                                                                                                                                                                                    prettier/prettier
   79:12   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   80:17   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   81:28   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   82:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   83:22   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   84:34   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   85:49   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   86:8    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   87:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   88:22   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   89:34   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   90:72   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   91:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   92:6    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   93:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   94:4    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
   95:33   error  Replace `␍⏎··requiredRoles:·string[],␍⏎··requireAll:·boolean·=·false␍⏎):·CanActivateFn·{␍` with `requiredRoles:·string[],·requireAll:·boolean·=·false):·CanActivateFn·{`                                                                       prettier/prettier
   97:3    error  Type boolean trivially inferred from a boolean literal, remove type annotation                                                                                                                                                                 @typescript-eslint/no-inferrable-types
   99:95   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  100:31   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  101:35   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  102:46   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  103:1    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  104:17   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  105:29   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  106:48   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  107:41   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  108:45   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  109:10   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  110:24   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  111:6    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  112:1    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  113:12   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  114:59   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  115:22   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  116:58   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  117:63   error  Replace `·//·支援多角色␍` with `//·支援多角色`                                                                                                                                                                                                           prettier/prettier
  118:1    error  Delete `········␍`                                                                                                                                                                                                                             prettier/prettier
  119:22   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  120:27   error  Replace `␍⏎··········...(userRole·?·[userRole]·:·[]),␍⏎··········...(userRoles·||·[])␍⏎········];␍` with `...(userRole·?·[userRole]·:·[]),·...(userRoles·||·[])];`                                                                             prettier/prettier
  124:1    error  Delete `········␍`                                                                                                                                                                                                                             prettier/prettier
  125:21   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  126:35   error  Replace `␍⏎··········?·requiredRoles.every(r·=>·allRoles.includes(r))␍⏎··········:·requiredRoles.some(r·=>·allRoles.includes(r));␍` with `·?·requiredRoles.every(r·=>·allRoles.includes(r))·:·requiredRoles.some(r·=>·allRoles.includes(r));`  prettier/prettier
  129:1    error  Delete `········␍`                                                                                                                                                                                                                             prettier/prettier
  130:24   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  131:10   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  132:23   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  133:24   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  134:61   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  135:40   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  136:34   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  137:10   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  138:9    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  139:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  140:5    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  141:2    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  142:1    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  143:4    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  144:12   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  145:15   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  146:3    error  Delete `·␍`                                                                                                                                                                                                                                    prettier/prettier
  147:35   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  148:3    error  Delete `·␍`                                                                                                                                                                                                                                    prettier/prettier
  149:12   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  150:17   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  151:28   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  152:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  153:40   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  154:41   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  155:42   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  156:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  157:6    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  158:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  159:4    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  160:53   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  161:95   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  162:31   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  163:35   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  164:46   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  165:1    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  166:20   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  167:58   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  168:1    error  Delete `····␍`                                                                                                                                                                                                                                 prettier/prettier
  169:26   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  170:57   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  171:24   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  172:6    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  173:1    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  174:17   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  175:29   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  176:41   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  177:45   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  178:10   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  179:24   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  180:6    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  181:1    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  182:14   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  183:59   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  184:22   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  185:66   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  186:74   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  187:1    error  Delete `········␍`                                                                                                                                                                                                                             prettier/prettier
  188:24   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  189:33   error  Replace `␍⏎··········userTenantId·===·routeTenantId·||␍⏎··········userTenants.includes(routeTenantId);␍` with `userTenantId·===·routeTenantId·||·userTenants.includes(routeTenantId);`                                                         prettier/prettier
  192:1    error  Delete `········␍`                                                                                                                                                                                                                             prettier/prettier
  193:32   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  194:10   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  195:31   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  196:32   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  197:67   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  198:39   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  199:34   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  200:10   error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  201:9    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  202:7    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  203:5    error  Delete `␍`                                                                                                                                                                                                                                     prettier/prettier
  204:2    error  Delete `␍⏎␍`                                                                                                                                                                                                                                   prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\core\models\firebase-token.model.ts
    1:43  error    Delete `␍`                                prettier/prettier
    2:1   error    Delete `␍`                                prettier/prettier
    3:4   error    Delete `␍`                                prettier/prettier
    4:21  error    Delete `␍`                                prettier/prettier
    5:47  error    Delete `␍`                                prettier/prettier
    6:4   error    Delete `␍`                                prettier/prettier
    7:58  error    Delete `␍`                                prettier/prettier
    8:32  error    Delete `␍`                                prettier/prettier
    9:17  error    Delete `␍`                                prettier/prettier
   10:1   error    Delete `··␍`                              prettier/prettier
   11:27  error    Delete `␍`                                prettier/prettier
   12:19  error    Delete `␍`                                prettier/prettier
   13:1   error    Delete `··␍`                              prettier/prettier
   14:31  error    Delete `␍`                                prettier/prettier
   15:26  error    Delete `␍`                                prettier/prettier
   16:16  error    Delete `␍`                                prettier/prettier
   17:1   error    Delete `··␍`                              prettier/prettier
   18:19  error    Delete `␍`                                prettier/prettier
   19:18  error    Delete `␍`                                prettier/prettier
   20:1   error    Delete `··␍`                              prettier/prettier
   21:21  error    Delete `␍`                                prettier/prettier
   22:28  error    Delete `␍`                                prettier/prettier
   23:1   error    Delete `··␍`                              prettier/prettier
   24:17  error    Delete `␍`                                prettier/prettier
   25:17  error    Delete `␍`                                prettier/prettier
   26:1   error    Delete `··␍`                              prettier/prettier
   27:19  error    Delete `␍`                                prettier/prettier
   28:20  error    Delete `␍`                                prettier/prettier
   29:1   error    Delete `··␍`                              prettier/prettier
   30:37  error    Delete `␍`                                prettier/prettier
   31:38  error    Delete `␍`                                prettier/prettier
   32:17  error    Delete `␍`                                prettier/prettier
   33:1   error    Delete `··␍`                              prettier/prettier
   34:17  error    Delete `␍`                                prettier/prettier
   35:26  error    Delete `␍`                                prettier/prettier
   36:1   error    Delete `··␍`                              prettier/prettier
   37:25  error    Delete `␍`                                prettier/prettier
   38:21  error    Delete `␍`                                prettier/prettier
   39:1   error    Delete `··␍`                              prettier/prettier
   40:26  error    Delete `␍`                                prettier/prettier
   41:22  error    Delete `␍`                                prettier/prettier
   42:1   error    Delete `··␍`                              prettier/prettier
   43:15  error    Delete `␍`                                prettier/prettier
   44:25  error    Delete `␍`                                prettier/prettier
   45:1   error    Delete `··␍`                              prettier/prettier
   46:17  error    Delete `␍`                                prettier/prettier
   47:21  error    Delete `␍`                                prettier/prettier
   48:1   error    Delete `··␍`                              prettier/prettier
   49:30  error    Delete `␍`                                prettier/prettier
   50:28  error    Delete `␍`                                prettier/prettier
   51:1   error    Delete `··␍`                              prettier/prettier
   52:27  error    Delete `␍`                                prettier/prettier
   53:20  error    Delete `␍`                                prettier/prettier
   54:21  error    Delete `␍`                                prettier/prettier
   55:1   error    Delete `··␍`                              prettier/prettier
   56:28  error    Delete `␍`                                prettier/prettier
   57:27  error    Delete `␍`                                prettier/prettier
   58:1   error    Delete `··␍`                              prettier/prettier
   59:43  error    Delete `␍`                                prettier/prettier
   60:27  error    Delete `␍`                                prettier/prettier
   61:1   error    Delete `··␍`                              prettier/prettier
   62:26  error    Delete `␍`                                prettier/prettier
   63:33  error    Delete `␍`                                prettier/prettier
   64:1   error    Delete `··␍`                              prettier/prettier
   65:14  error    Delete `␍`                                prettier/prettier
   66:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   66:22  error    Delete `␍`                                prettier/prettier
   67:2   error    Delete `␍`                                prettier/prettier
   68:1   error    Delete `␍`                                prettier/prettier
   69:4   error    Delete `␍`                                prettier/prettier
   70:17  error    Delete `␍`                                prettier/prettier
   71:4   error    Delete `␍`                                prettier/prettier
   72:32  error    Delete `␍`                                prettier/prettier
   73:13  error    Delete `␍`                                prettier/prettier
   74:39  error    Delete `␍`                                prettier/prettier
   75:1   error    Delete `··␍`                              prettier/prettier
   76:13  error    Delete `␍`                                prettier/prettier
   77:35  error    Delete `␍`                                prettier/prettier
   78:1   error    Delete `··␍`                              prettier/prettier
   79:13  error    Delete `␍`                                prettier/prettier
   80:37  error    Delete `␍`                                prettier/prettier
   81:1   error    Delete `··␍`                              prettier/prettier
   82:19  error    Delete `␍`                                prettier/prettier
   83:29  error    Delete `␍`                                prettier/prettier
   84:1   error    Delete `··␍`                              prettier/prettier
   85:13  error    Delete `␍`                                prettier/prettier
   86:31  error    Delete `␍`                                prettier/prettier
   87:1   error    Delete `··␍`                              prettier/prettier
   88:14  error    Delete `␍`                                prettier/prettier
   89:18  error    Delete `␍`                                prettier/prettier
   90:2   error    Delete `␍`                                prettier/prettier
   91:1   error    Delete `␍`                                prettier/prettier
   92:4   error    Delete `␍`                                prettier/prettier
   93:17  error    Delete `␍`                                prettier/prettier
   94:4   error    Delete `␍`                                prettier/prettier
   95:34  error    Delete `␍`                                prettier/prettier
   96:24  error    Delete `␍`                                prettier/prettier
   97:31  error    Delete `␍`                                prettier/prettier
   98:1   error    Delete `··␍`                              prettier/prettier
   99:16  error    Delete `␍`                                prettier/prettier
  100:25  error    Delete `␍`                                prettier/prettier
  101:1   error    Delete `··␍`                              prettier/prettier
  102:18  error    Delete `␍`                                prettier/prettier
  103:29  error    Delete `␍`                                prettier/prettier
  104:1   error    Delete `··␍`                              prettier/prettier
  105:16  error    Delete `␍`                                prettier/prettier
  106:25  error    Delete `␍`                                prettier/prettier
  107:1   error    Delete `··␍`                              prettier/prettier
  108:19  error    Delete `␍`                                prettier/prettier
  109:31  error    Delete `␍`                                prettier/prettier
  110:1   error    Delete `··␍`                              prettier/prettier
  111:15  error    Delete `␍`                                prettier/prettier
  112:23  error    Delete `␍`                                prettier/prettier
  113:1   error    Delete `··␍`                              prettier/prettier
  114:14  error    Delete `␍`                                prettier/prettier
  115:19  error    Delete `␍`                                prettier/prettier
  116:1   error    Delete `··␍`                              prettier/prettier
  117:12  error    Delete `␍`                                prettier/prettier
  118:27  error    Delete `␍`                                prettier/prettier
  119:1   error    Delete `··␍`                              prettier/prettier
  120:18  error    Delete `␍`                                prettier/prettier
  121:32  error    Delete `␍`                                prettier/prettier
  122:2   error    Delete `␍`                                prettier/prettier
  123:1   error    Delete `␍`                                prettier/prettier
  124:4   error    Delete `␍`                                prettier/prettier
  125:14  error    Delete `␍`                                prettier/prettier
  126:4   error    Delete `␍`                                prettier/prettier
  127:39  error    Delete `␍`                                prettier/prettier
  128:16  error    Delete `␍`                                prettier/prettier
  129:26  error    Delete `␍`                                prettier/prettier
  130:1   error    Delete `··␍`                              prettier/prettier
  131:20  error    Delete `␍`                                prettier/prettier
  132:23  error    Delete `␍`                                prettier/prettier
  133:1   error    Delete `··␍`                              prettier/prettier
  134:18  error    Delete `␍`                                prettier/prettier
  135:23  error    Delete `␍`                                prettier/prettier
  136:1   error    Delete `··␍`                              prettier/prettier
  137:25  error    Delete `␍`                                prettier/prettier
  138:20  error    Delete `␍`                                prettier/prettier
  139:2   error    Delete `␍`                                prettier/prettier
  140:1   error    Delete `␍`                                prettier/prettier
  141:4   error    Delete `␍`                                prettier/prettier
  142:17  error    Delete `␍`                                prettier/prettier
  143:4   error    Delete `␍`                                prettier/prettier
  144:37  error    Delete `␍`                                prettier/prettier
  145:14  error    Delete `␍`                                prettier/prettier
  146:79  error    Delete `␍`                                prettier/prettier
  147:1   error    Delete `··␍`                              prettier/prettier
  148:15  error    Delete `␍`                                prettier/prettier
  149:21  error    Delete `␍`                                prettier/prettier
  150:1   error    Delete `··␍`                              prettier/prettier
  151:21  error    Delete `␍`                                prettier/prettier
  152:16  error    Delete `␍`                                prettier/prettier
  153:1   error    Delete `··␍`                              prettier/prettier
  154:18  error    Delete `␍`                                prettier/prettier
  155:32  error    Delete `␍`                                prettier/prettier
  156:1   error    Delete `··␍`                              prettier/prettier
  157:18  error    Delete `␍`                                prettier/prettier
  158:18  error    Delete `␍`                                prettier/prettier
  159:1   error    Delete `··␍`                              prettier/prettier
  160:14  error    Delete `␍`                                prettier/prettier
  161:10  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  161:14  error    Delete `␍`                                prettier/prettier
  162:2   error    Delete `␍⏎␍`                              prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\core\net\default.interceptor.ts
   9:1    error    `./firebase-refresh-token` import should occur before import of `./helper`  import/order
  11:80   warning  Unexpected any. Specify a different type                                    @typescript-eslint/no-explicit-any
  11:119  warning  Unexpected any. Specify a different type                                    @typescript-eslint/no-explicit-any
  41:49   warning  Unexpected any. Specify a different type                                    @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\core\net\firebase-auth.interceptor.ts
    1:49  error    'HttpContext' is defined but never used. Allowed unused vars must match /^_/u                                                                                                   @typescript-eslint/no-unused-vars
    1:91  error    Delete `␍`                                                                                                                                                                      prettier/prettier
    2:50  error    Delete `␍`                                                                                                                                                                      prettier/prettier
    3:43  error    Delete `␍`                                                                                                                                                                      prettier/prettier
    4:65  error    Delete `␍`                                                                                                                                                                      prettier/prettier
    5:53  error    Delete `␍`                                                                                                                                                                      prettier/prettier
    6:56  error    Delete `␍`                                                                                                                                                                      prettier/prettier
    7:1   error    `@angular/router` import should occur before import of `@delon/auth`                                                                                                            import/order
    7:42  error    Delete `␍`                                                                                                                                                                      prettier/prettier
    8:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
    9:4   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   10:18  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   11:36  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   12:4   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   13:41  error    Replace `␍⏎··req:·HttpRequest<any>,␍⏎··next:·HttpHandlerFn␍⏎):·Observable<HttpEvent<any>>·{␍` with `req:·HttpRequest<any>,·next:·HttpHandlerFn):·Observable<HttpEvent<any>>·{`  prettier/prettier
   14:20  warning  Unexpected any. Specify a different type                                                                                                                                        @typescript-eslint/no-explicit-any
   16:25  warning  Unexpected any. Specify a different type                                                                                                                                        @typescript-eslint/no-explicit-any
   17:37  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   18:35  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   19:55  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   20:39  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   21:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   22:17  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   23:42  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   24:22  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   25:4   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   26:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   27:40  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   28:32  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   29:22  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   30:4   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   31:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   32:29  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   33:40  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   34:1   error    Delete `··␍`                                                                                                                                                                    prettier/prettier
   35:22  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   36:18  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   37:55  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   38:41  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   39:47  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   40:4   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   41:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   42:34  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   43:46  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   44:27  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   45:22  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   46:63  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   47:45  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   48:60  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   49:8   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   50:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   51:32  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   52:36  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   53:22  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   54:11  error    Replace `'Authorization':·`Bearer·${idToken}`,␍` with `Authorization:·`Bearer·${idToken}`,`                                                                                     prettier/prettier
   55:44  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   56:62  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   57:10  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   58:10  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   59:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   60:44  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   61:25  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   62:24  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   63:31  error    Replace `(60·*·60·*·1000)·//·Firebase·Token·預設·1·小時␍` with `60·*·60·*·1000·//·Firebase·Token·預設·1·小時`                                                                           prettier/prettier
   64:10  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   65:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   66:30  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   67:8   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   68:24  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   69:56  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   70:36  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   71:7   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   72:5   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   73:2   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   74:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   75:4   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   76:15  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   77:31  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   78:4   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   79:47  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   80:32  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   81:22  error    Replace `·//·完整·URL（http://·或·https://）␍` with `//·完整·URL（http://·或·https://）`                                                                                                  prettier/prettier
   82:13  error    Replace `,··········//·協議相對·URL（//example.com）␍` with `·//·協議相對·URL（//example.com）`                                                                                             prettier/prettier
   83:5   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   84:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   85:65  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   86:2   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   87:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   88:4   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   89:14  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   90:20  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   91:4   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   92:10  error    'shouldSkipAuth' is defined but never used. Allowed unused vars must match /^_/u                                                                                                @typescript-eslint/no-unused-vars
   92:48  error    Delete `␍`                                                                                                                                                                      prettier/prettier
   93:29  error    Replace `␍⏎····'/api/public/',␍⏎····'/api/health',␍⏎····'/api/version'␍⏎··];␍` with `'/api/public/',·'/api/health',·'/api/version'];`                                           prettier/prettier
   98:1   error    Delete `␍`                                                                                                                                                                      prettier/prettier
   99:66  error    Delete `␍`                                                                                                                                                                      prettier/prettier
  100:2   error    Delete `␍⏎␍`                                                                                                                                                                    prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\core\net\firebase-refresh-token.ts
    1:96  error    Delete `␍`                                                                                                                                                                        prettier/prettier
    2:42  error    Delete `␍`                                                                                                                                                                        prettier/prettier
    3:43  error    Delete `␍`                                                                                                                                                                        prettier/prettier
    4:48  error    Delete `␍`                                                                                                                                                                        prettier/prettier
    5:70  error    Delete `␍`                                                                                                                                                                        prettier/prettier
    6:1   error    There should be at least one empty line between import groups                                                                                                                     import/order
    6:70  error    Delete `␍`                                                                                                                                                                        prettier/prettier
    7:36  error    Delete `␍`                                                                                                                                                                        prettier/prettier
    8:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
    9:10  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   10:27  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   11:62  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   12:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   13:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   14:24  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   15:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   16:10  error    'reAttachFirebaseToken' is defined but never used. Allowed unused vars must match /^_/u                                                                                           @typescript-eslint/no-unused-vars
   16:32  error    Replace `␍⏎··injector:·Injector,␍⏎··req:·HttpRequest<any>␍⏎):·Observable<HttpRequest<any>>·{␍` with `injector:·Injector,·req:·HttpRequest<any>):·Observable<HttpRequest<any>>·{`  prettier/prettier
   18:20  warning  Unexpected any. Specify a different type                                                                                                                                          @typescript-eslint/no-explicit-any
   19:27  warning  Unexpected any. Specify a different type                                                                                                                                          @typescript-eslint/no-explicit-any
   20:35  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   21:1   error    Delete `··␍`                                                                                                                                                                      prettier/prettier
   22:27  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   23:47  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   24:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   25:1   error    Delete `··␍`                                                                                                                                                                      prettier/prettier
   26:51  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   27:25  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   28:33  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   29:22  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   30:11  error    Replace `'Authorization':·`Bearer·${token}`␍` with `Authorization:·`Bearer·${token}``                                                                                             prettier/prettier
   31:10  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   32:10  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   33:29  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   34:7   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   35:5   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   36:2   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   37:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   38:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   39:23  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   40:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   41:72  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   42:35  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   43:1   error    Delete `··␍`                                                                                                                                                                      prettier/prettier
   44:27  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   45:47  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   46:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   47:1   error    Delete `··␍`                                                                                                                                                                      prettier/prettier
   48:25  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   49:50  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   50:2   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   51:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   52:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   53:33  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   54:3   error    Delete `·␍`                                                                                                                                                                       prettier/prettier
   55:36  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   56:21  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   57:19  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   58:22  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   59:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   60:41  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   61:22  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   62:24  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   63:20  warning  Unexpected any. Specify a different type                                                                                                                                          @typescript-eslint/no-explicit-any
   63:25  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   64:22  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   65:25  warning  Unexpected any. Specify a different type                                                                                                                                          @typescript-eslint/no-explicit-any
   65:32  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   66:35  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   67:55  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   68:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   69:19  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   70:27  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   71:51  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   72:23  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   73:33  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   74:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   75:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   76:24  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   77:23  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   78:51  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   79:1   error    Delete `····␍`                                                                                                                                                                    prettier/prettier
   80:31  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   81:24  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   82:15  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   83:27  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   84:29  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   85:38  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   86:25  error    Replace `'Authorization':·`Bearer·${token}`·}␍` with `Authorization:·`Bearer·${token}`·}`                                                                                         prettier/prettier
   87:12  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   88:32  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   89:9   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   90:7   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   91:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   92:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   93:15  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   94:51  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   95:24  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   96:28  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   97:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
   98:46  error    Delete `␍`                                                                                                                                                                        prettier/prettier
   99:21  error    Replace `(newToken)·=>·{␍` with `newToken·=>·{`                                                                                                                                   prettier/prettier
  100:39  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  101:65  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  102:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
  103:30  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  104:25  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  105:25  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  106:60  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  107:25  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  108:10  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  109:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
  110:18  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  111:29  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  112:36  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  113:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
  114:52  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  115:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
  116:18  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  117:36  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  118:23  error    Replace `'Authorization':·`Bearer·${newToken}`·}␍` with `Authorization:·`Bearer·${newToken}`·}`                                                                                   prettier/prettier
  119:10  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  120:1   error    Delete `······␍`                                                                                                                                                                  prettier/prettier
  121:30  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  122:8   error    Delete `␍`                                                                                                                                                                        prettier/prettier
  123:27  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  124:26  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  125:14  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  126:29  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  127:32  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  128:1   error    Delete `······␍`                                                                                                                                                                  prettier/prettier
  129:62  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  130:25  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  131:1   error    Delete `······␍`                                                                                                                                                                  prettier/prettier
  132:38  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  133:7   error    Delete `␍`                                                                                                                                                                        prettier/prettier
  134:5   error    Delete `␍`                                                                                                                                                                        prettier/prettier
  135:2   error    Delete `␍`                                                                                                                                                                        prettier/prettier
  136:1   error    Delete `␍`                                                                                                                                                                        prettier/prettier
  137:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
  138:18  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  139:4   error    Delete `␍`                                                                                                                                                                        prettier/prettier
  140:52  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  141:25  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  142:28  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  143:45  error    Delete `␍`                                                                                                                                                                        prettier/prettier
  144:2   error    Delete `␍⏎␍`                                                                                                                                                                      prettier/prettier

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

C:\Users\user\Downloads\ng-alain-build\src\app\core\services\auto-refresh.service.ts
    1:63  error  Delete `␍`                                                                                                                                   prettier/prettier
    2:52  error  Delete `␍`                                                                                                                                   prettier/prettier
    3:48  error  Delete `␍`                                                                                                                                   prettier/prettier
    4:85  error  Delete `␍`                                                                                                                                   prettier/prettier
    5:1   error  There should be at least one empty line between import groups                                                                                import/order
    5:1   error  `@env/environment` import should occur before import of `rxjs`                                                                               import/order
    5:48  error  Delete `␍`                                                                                                                                   prettier/prettier
    6:69  error  Delete `␍`                                                                                                                                   prettier/prettier
    7:1   error  `./delon-firebase-token.service` import should occur before import of `../models/firebase-token.model`                                       import/order
    7:76  error  Delete `␍`                                                                                                                                   prettier/prettier
    8:1   error  Delete `␍`                                                                                                                                   prettier/prettier
    9:4   error  Delete `␍`                                                                                                                                   prettier/prettier
   10:17  error  Delete `␍`                                                                                                                                   prettier/prettier
   11:12  error  Delete `␍`                                                                                                                                   prettier/prettier
   12:33  error  Delete `␍`                                                                                                                                   prettier/prettier
   13:24  error  Delete `␍`                                                                                                                                   prettier/prettier
   14:4   error  Delete `␍`                                                                                                                                   prettier/prettier
   15:36  error  Delete `␍`                                                                                                                                   prettier/prettier
   16:55  error  Delete `␍`                                                                                                                                   prettier/prettier
   17:31  error  Delete `␍`                                                                                                                                   prettier/prettier
   18:51  error  Delete `␍`                                                                                                                                   prettier/prettier
   19:65  error  Delete `␍`                                                                                                                                   prettier/prettier
   20:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   21:46  error  Delete `␍`                                                                                                                                   prettier/prettier
   22:52  error  Delete `␍`                                                                                                                                   prettier/prettier
   23:29  error  Delete `␍`                                                                                                                                   prettier/prettier
   24:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   25:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   26:12  error  Delete `␍`                                                                                                                                   prettier/prettier
   27:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   28:18  error  Delete `␍`                                                                                                                                   prettier/prettier
   29:26  error  Delete `␍`                                                                                                                                   prettier/prettier
   30:47  error  Delete `␍`                                                                                                                                   prettier/prettier
   31:14  error  Delete `␍`                                                                                                                                   prettier/prettier
   32:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   33:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   34:49  error  Delete `␍`                                                                                                                                   prettier/prettier
   35:27  error  Delete `␍`                                                                                                                                   prettier/prettier
   36:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   37:35  error  Delete `␍`                                                                                                                                   prettier/prettier
   38:32  error  Delete `␍`                                                                                                                                   prettier/prettier
   39:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   40:26  error  Delete `␍`                                                                                                                                   prettier/prettier
   41:31  error  Delete `␍`                                                                                                                                   prettier/prettier
   42:4   error  Delete `␍`                                                                                                                                   prettier/prettier
   43:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   44:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   45:12  error  Delete `␍`                                                                                                                                   prettier/prettier
   46:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   47:17  error  Delete `␍`                                                                                                                                   prettier/prettier
   48:27  error  Delete `␍`                                                                                                                                   prettier/prettier
   49:45  error  Delete `␍`                                                                                                                                   prettier/prettier
   50:14  error  Delete `␍`                                                                                                                                   prettier/prettier
   51:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   52:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   53:49  error  Delete `␍`                                                                                                                                   prettier/prettier
   54:28  error  Delete `␍`                                                                                                                                   prettier/prettier
   55:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   56:45  error  Delete `␍`                                                                                                                                   prettier/prettier
   57:51  error  Delete `␍`                                                                                                                                   prettier/prettier
   58:4   error  Delete `␍`                                                                                                                                   prettier/prettier
   59:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   60:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   61:12  error  Delete `␍`                                                                                                                                   prettier/prettier
   62:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   63:20  error  Delete `␍`                                                                                                                                   prettier/prettier
   64:17  error  Delete `␍`                                                                                                                                   prettier/prettier
   65:18  error  Delete `␍`                                                                                                                                   prettier/prettier
   66:4   error  Delete `␍`                                                                                                                                   prettier/prettier
   67:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   68:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   69:14  error  Delete `␍`                                                                                                                                   prettier/prettier
   70:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   71:24  error  Delete `␍`                                                                                                                                   prettier/prettier
   72:27  error  Delete `␍`                                                                                                                                   prettier/prettier
   73:4   error  Delete `␍`                                                                                                                                   prettier/prettier
   74:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   75:22  error  Delete `␍`                                                                                                                                   prettier/prettier
   76:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   77:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   78:28  error  Delete `␍`                                                                                                                                   prettier/prettier
   79:6   error  Delete `␍`                                                                                                                                   prettier/prettier
   80:40  error  Delete `␍`                                                                                                                                   prettier/prettier
   81:50  error  Replace `.pipe(␍` with `⏎······.pipe(`                                                                                                       prettier/prettier
   82:1   error  Replace `······filter(token·=>·!!token),␍` with `········filter(token·=>·!!token),`                                                          prettier/prettier
   83:1   error  Replace `······catchError(err·=>·{␍` with `········catchError(err·=>·{`                                                                      prettier/prettier
   84:1   error  Replace `········console.error('[Auto·Refresh]·idToken·監聽錯誤:',·err);␍` with `··········console.error('[Auto·Refresh]·idToken·監聽錯誤:',·err);`  prettier/prettier
   85:9   error  Replace `return·EMPTY;␍` with `··return·EMPTY;`                                                                                              prettier/prettier
   86:1   error  Replace `······})␍` with `········})`                                                                                                        prettier/prettier
   87:1   error  Replace `····).subscribe(async·(token)·=>·{␍` with `······)⏎······.subscribe(async·token·=>·{`                                               prettier/prettier
   87:24  error  'token' is defined but never used. Allowed unused args must match /^_/u                                                                      @typescript-eslint/no-unused-vars
   88:1   error  Replace `······console.log('[Auto·Refresh]·Firebase·Token·已更新');␍` with `········console.log('[Auto·Refresh]·Firebase·Token·已更新');`          prettier/prettier
   89:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   90:1   error  Replace `······try·{␍` with `········try·{`                                                                                                  prettier/prettier
   91:1   error  Replace `········//·同步到·@delon/auth␍` with `··········//·同步到·@delon/auth`                                                                    prettier/prettier
   92:9   error  Replace `await·this.syncToken();␍` with `··await·this.syncToken();`                                                                          prettier/prettier
   93:1   error  Replace `······}·catch·(error)·{␍` with `········}·catch·(error)·{`                                                                          prettier/prettier
   94:1   error  Replace `········console.error('[Auto·Refresh]·Token·同步失敗:',·error);␍` with `··········console.error('[Auto·Refresh]·Token·同步失敗:',·error);`  prettier/prettier
   95:1   error  Replace `······}␍` with `········}`                                                                                                          prettier/prettier
   96:1   error  Replace `····});␍` with `······});`                                                                                                          prettier/prettier
   97:4   error  Delete `␍`                                                                                                                                   prettier/prettier
   98:1   error  Delete `␍`                                                                                                                                   prettier/prettier
   99:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  100:19  error  Delete `␍`                                                                                                                                   prettier/prettier
  101:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  102:39  error  Delete `␍`                                                                                                                                   prettier/prettier
  103:15  error  Delete `␍`                                                                                                                                   prettier/prettier
  104:37  error  Delete `␍`                                                                                                                                   prettier/prettier
  105:1   error  Delete `␍`                                                                                                                                   prettier/prettier
  106:61  error  Replace `.pipe(␍` with `⏎······.pipe(`                                                                                                       prettier/prettier
  107:1   error  Replace `······switchMap(()·=>·this.checkAndRefresh()),␍` with `········switchMap(()·=>·this.checkAndRefresh()),`                            prettier/prettier
  108:1   error  Replace `······catchError(err·=>·{␍` with `········catchError(err·=>·{`                                                                      prettier/prettier
  109:1   error  Replace `········console.error('[Auto·Refresh]·定期檢查錯誤:',·err);␍` with `··········console.error('[Auto·Refresh]·定期檢查錯誤:',·err);`              prettier/prettier
  110:1   error  Replace `········return·EMPTY;␍` with `··········return·EMPTY;`                                                                              prettier/prettier
  111:1   error  Replace `······})␍` with `········})`                                                                                                        prettier/prettier
  112:5   error  Replace `).subscribe();␍` with `··)⏎······.subscribe();`                                                                                     prettier/prettier
  113:4   error  Delete `␍`                                                                                                                                   prettier/prettier
  114:1   error  Delete `␍`                                                                                                                                   prettier/prettier
  115:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  116:17  error  Delete `␍`                                                                                                                                   prettier/prettier
  117:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  118:51  error  Delete `␍`                                                                                                                                   prettier/prettier
  119:65  error  Delete `␍`                                                                                                                                   prettier/prettier
  120:1   error  Delete `····␍`                                                                                                                               prettier/prettier
  121:36  error  Delete `␍`                                                                                                                                   prettier/prettier
  122:14  error  Delete `␍`                                                                                                                                   prettier/prettier
  123:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  124:1   error  Delete `␍`                                                                                                                                   prettier/prettier
  125:50  error  Delete `␍`                                                                                                                                   prettier/prettier
  126:75  error  Delete `␍`                                                                                                                                   prettier/prettier
  127:1   error  Delete `␍`                                                                                                                                   prettier/prettier
  128:17  error  Delete `␍`                                                                                                                                   prettier/prettier
  129:51  error  Delete `␍`                                                                                                                                   prettier/prettier
  130:61  error  Delete `␍`                                                                                                                                   prettier/prettier
  131:81  error  Delete `␍`                                                                                                                                   prettier/prettier
  132:1   error  Delete `······␍`                                                                                                                             prettier/prettier
  133:33  error  Delete `␍`                                                                                                                                   prettier/prettier
  134:33  error  Delete `␍`                                                                                                                                   prettier/prettier
  135:55  error  Delete `␍`                                                                                                                                   prettier/prettier
  136:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  137:4   error  Delete `␍`                                                                                                                                   prettier/prettier
  138:1   error  Delete `␍`                                                                                                                                   prettier/prettier
  139:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  140:16  error  Delete `␍`                                                                                                                                   prettier/prettier
  141:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  142:48  error  Delete `␍`                                                                                                                                   prettier/prettier
  143:40  error  Delete `␍`                                                                                                                                   prettier/prettier
  144:17  error  Delete `␍`                                                                                                                                   prettier/prettier
  145:48  error  Delete `␍`                                                                                                                                   prettier/prettier
  146:14  error  Delete `␍`                                                                                                                                   prettier/prettier
  147:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  148:1   error  Delete `␍`                                                                                                                                   prettier/prettier
  149:10  error  Delete `␍`                                                                                                                                   prettier/prettier
  150:13  error  'newToken' is assigned a value but never used. Allowed unused vars must match /^_/u                                                          @typescript-eslint/no-unused-vars
  150:52  error  Delete `␍`                                                                                                                                   prettier/prettier
  151:30  error  Delete `␍`                                                                                                                                   prettier/prettier
  152:48  error  Delete `␍`                                                                                                                                   prettier/prettier
  153:22  error  Delete `␍`                                                                                                                                   prettier/prettier
  154:58  error  Delete `␍`                                                                                                                                   prettier/prettier
  155:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  156:4   error  Delete `␍`                                                                                                                                   prettier/prettier
  157:1   error  Delete `␍`                                                                                                                                   prettier/prettier
  158:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  159:28  error  Delete `␍`                                                                                                                                   prettier/prettier
  160:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  161:45  error  Delete `␍`                                                                                                                                   prettier/prettier
  162:10  error  Delete `␍`                                                                                                                                   prettier/prettier
  163:55  error  Delete `␍`                                                                                                                                   prettier/prettier
  164:22  error  Delete `␍`                                                                                                                                   prettier/prettier
  165:58  error  Delete `␍`                                                                                                                                   prettier/prettier
  166:19  error  Delete `␍`                                                                                                                                   prettier/prettier
  167:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  168:4   error  Delete `␍`                                                                                                                                   prettier/prettier
  169:1   error  Delete `␍`                                                                                                                                   prettier/prettier
  170:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  171:13  error  Delete `␍`                                                                                                                                   prettier/prettier
  172:6   error  Delete `␍`                                                                                                                                   prettier/prettier
  173:24  error  Delete `␍`                                                                                                                                   prettier/prettier
  174:17  error  Delete `␍`                                                                                                                                   prettier/prettier
  175:4   error  Delete `␍`                                                                                                                                   prettier/prettier
  176:2   error  Delete `␍⏎␍`                                                                                                                                 prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\core\services\delon-firebase-token.service.ts
    1:52  error  Delete `␍`                                                                                                                             prettier/prettier
    2:43  error  Delete `␍`                                                                                                                             prettier/prettier
    3:1   error  There should be at least one empty line between import groups                                                                          import/order
    3:48  error  Delete `␍`                                                                                                                             prettier/prettier
    4:69  error  Delete `␍`                                                                                                                             prettier/prettier
    5:1   error  Delete `␍`                                                                                                                             prettier/prettier
    6:4   error  Delete `␍`                                                                                                                             prettier/prettier
    7:37  error  Delete `␍`                                                                                                                             prettier/prettier
    8:52  error  Delete `␍`                                                                                                                             prettier/prettier
    9:4   error  Delete `␍`                                                                                                                             prettier/prettier
   10:36  error  Delete `␍`                                                                                                                             prettier/prettier
   11:41  error  Delete `␍`                                                                                                                             prettier/prettier
   12:31  error  Delete `␍`                                                                                                                             prettier/prettier
   13:51  error  Delete `␍`                                                                                                                             prettier/prettier
   14:1   error  Delete `␍`                                                                                                                             prettier/prettier
   15:6   error  Delete `␍`                                                                                                                             prettier/prettier
   16:39  error  Delete `␍`                                                                                                                             prettier/prettier
   17:6   error  Delete `␍`                                                                                                                             prettier/prettier
   18:44  error  Delete `␍`                                                                                                                             prettier/prettier
   19:40  error  Delete `␍`                                                                                                                             prettier/prettier
   20:1   error  Delete `····␍`                                                                                                                         prettier/prettier
   21:17  error  Delete `␍`                                                                                                                             prettier/prettier
   22:50  error  Delete `␍`                                                                                                                             prettier/prettier
   23:33  error  Delete `␍`                                                                                                                             prettier/prettier
   24:14  error  Delete `␍`                                                                                                                             prettier/prettier
   25:6   error  Delete `␍`                                                                                                                             prettier/prettier
   26:1   error  Delete `␍`                                                                                                                             prettier/prettier
   27:10  error  Delete `␍`                                                                                                                             prettier/prettier
   28:52  error  Delete `␍`                                                                                                                             prettier/prettier
   29:1   error  Delete `······␍`                                                                                                                       prettier/prettier
   30:47  error  Delete `␍`                                                                                                                             prettier/prettier
   31:29  error  Delete `␍`                                                                                                                             prettier/prettier
   32:60  error  Delete `␍`                                                                                                                             prettier/prettier
   33:25  error  Delete `␍`                                                                                                                             prettier/prettier
   34:23  error  Delete `␍`                                                                                                                             prettier/prettier
   35:40  error  Delete `␍`                                                                                                                             prettier/prettier
   36:44  error  Delete `␍`                                                                                                                             prettier/prettier
   37:45  error  Delete `␍`                                                                                                                             prettier/prettier
   38:45  error  Delete `␍`                                                                                                                             prettier/prettier
   39:25  error  Delete `␍`                                                                                                                             prettier/prettier
   40:47  error  Delete `␍`                                                                                                                             prettier/prettier
   41:63  error  Delete `␍`                                                                                                                             prettier/prettier
   42:55  error  Delete `␍`                                                                                                                             prettier/prettier
   43:55  error  Delete `␍`                                                                                                                             prettier/prettier
   44:63  error  Delete `␍`                                                                                                                             prettier/prettier
   45:54  error  Delete `␍`                                                                                                                             prettier/prettier
   46:69  error  Delete `␍`                                                                                                                             prettier/prettier
   47:21  error  Delete `␍`                                                                                                                             prettier/prettier
   48:39  error  Delete `␍`                                                                                                                             prettier/prettier
   49:47  error  Delete `␍`                                                                                                                             prettier/prettier
   50:60  error  Delete `␍`                                                                                                                             prettier/prettier
   51:23  error  Delete `␍`                                                                                                                             prettier/prettier
   52:25  error  Delete `␍`                                                                                                                             prettier/prettier
   53:9   error  Delete `␍`                                                                                                                             prettier/prettier
   54:1   error  Delete `␍`                                                                                                                             prettier/prettier
   55:41  error  Delete `␍`                                                                                                                             prettier/prettier
   56:47  error  Delete `␍`                                                                                                                             prettier/prettier
   57:22  error  Delete `␍`                                                                                                                             prettier/prettier
   58:57  error  Delete `␍`                                                                                                                             prettier/prettier
   59:19  error  Delete `␍`                                                                                                                             prettier/prettier
   60:6   error  Delete `␍`                                                                                                                             prettier/prettier
   61:4   error  Delete `␍`                                                                                                                             prettier/prettier
   62:1   error  Delete `␍`                                                                                                                             prettier/prettier
   63:6   error  Delete `␍`                                                                                                                             prettier/prettier
   64:19  error  Delete `␍`                                                                                                                             prettier/prettier
   65:6   error  Delete `␍`                                                                                                                             prettier/prettier
   66:42  error  Delete `␍`                                                                                                                             prettier/prettier
   67:58  error  Delete `␍`                                                                                                                             prettier/prettier
   68:4   error  Delete `␍`                                                                                                                             prettier/prettier
   69:1   error  Delete `␍`                                                                                                                             prettier/prettier
   70:6   error  Delete `␍`                                                                                                                             prettier/prettier
   71:19  error  Delete `␍`                                                                                                                             prettier/prettier
   72:6   error  Delete `␍`                                                                                                                             prettier/prettier
   73:24  error  Delete `␍`                                                                                                                             prettier/prettier
   74:35  error  Delete `␍`                                                                                                                             prettier/prettier
   75:37  error  Delete `␍`                                                                                                                             prettier/prettier
   76:4   error  Delete `␍`                                                                                                                             prettier/prettier
   77:1   error  Delete `␍`                                                                                                                             prettier/prettier
   78:6   error  Delete `␍`                                                                                                                             prettier/prettier
   79:20  error  Delete `␍`                                                                                                                             prettier/prettier
   80:6   error  Delete `␍`                                                                                                                             prettier/prettier
   81:30  error  Delete `␍`                                                                                                                             prettier/prettier
   82:35  error  Delete `␍`                                                                                                                             prettier/prettier
   83:36  error  Delete `␍`                                                                                                                             prettier/prettier
   84:19  error  Delete `␍`                                                                                                                             prettier/prettier
   85:6   error  Delete `␍`                                                                                                                             prettier/prettier
   86:40  error  Delete `␍`                                                                                                                             prettier/prettier
   87:4   error  Delete `␍`                                                                                                                             prettier/prettier
   88:1   error  Delete `␍`                                                                                                                             prettier/prettier
   89:6   error  Delete `␍`                                                                                                                             prettier/prettier
   90:1   error  Expected 1 lines after block description                                                                                               jsdoc/tag-lines
   90:21  error  Delete `␍`                                                                                                                             prettier/prettier
   91:39  error  Delete `␍`                                                                                                                             prettier/prettier
   92:6   error  Delete `␍`                                                                                                                             prettier/prettier
   93:23  error  Type number trivially inferred from a number literal, remove type annotation                                                           @typescript-eslint/no-inferrable-types
   93:60  error  Delete `␍`                                                                                                                             prettier/prettier
   94:35  error  Delete `␍`                                                                                                                             prettier/prettier
   95:36  error  Delete `␍`                                                                                                                             prettier/prettier
   96:19  error  Delete `␍`                                                                                                                             prettier/prettier
   97:6   error  Delete `␍`                                                                                                                             prettier/prettier
   98:1   error  Delete `␍`                                                                                                                             prettier/prettier
   99:50  error  Delete `␍`                                                                                                                             prettier/prettier
  100:49  error  Delete `␍`                                                                                                                             prettier/prettier
  101:1   error  Delete `␍`                                                                                                                             prettier/prettier
  102:35  error  Delete `␍`                                                                                                                             prettier/prettier
  103:4   error  Delete `␍`                                                                                                                             prettier/prettier
  104:1   error  Delete `␍`                                                                                                                             prettier/prettier
  105:6   error  Delete `␍`                                                                                                                             prettier/prettier
  106:24  error  Delete `␍`                                                                                                                             prettier/prettier
  107:6   error  Delete `␍`                                                                                                                             prettier/prettier
  108:36  error  Delete `␍`                                                                                                                             prettier/prettier
  109:35  error  Delete `␍`                                                                                                                             prettier/prettier
  110:36  error  Delete `␍`                                                                                                                             prettier/prettier
  111:16  error  Delete `␍`                                                                                                                             prettier/prettier
  112:6   error  Delete `␍`                                                                                                                             prettier/prettier
  113:1   error  Delete `␍`                                                                                                                             prettier/prettier
  114:50  error  Delete `␍`                                                                                                                             prettier/prettier
  115:54  error  Delete `␍`                                                                                                                             prettier/prettier
  116:4   error  Delete `␍`                                                                                                                             prettier/prettier
  117:1   error  Delete `␍`                                                                                                                             prettier/prettier
  118:6   error  Delete `␍`                                                                                                                             prettier/prettier
  119:16  error  Delete `␍`                                                                                                                             prettier/prettier
  120:6   error  Delete `␍`                                                                                                                             prettier/prettier
  121:40  error  Delete `␍`                                                                                                                             prettier/prettier
  122:40  error  Delete `␍`                                                                                                                             prettier/prettier
  123:17  error  Delete `␍`                                                                                                                             prettier/prettier
  124:30  error  Delete `␍`                                                                                                                             prettier/prettier
  125:6   error  Delete `␍`                                                                                                                             prettier/prettier
  126:1   error  Delete `␍`                                                                                                                             prettier/prettier
  127:50  error  Delete `␍`                                                                                                                             prettier/prettier
  128:1   error  Delete `␍`                                                                                                                             prettier/prettier
  129:10  error  Delete `␍`                                                                                                                             prettier/prettier
  130:32  error  Delete `␍`                                                                                                                             prettier/prettier
  131:13  error  'newToken' is assigned a value but never used. Allowed unused vars must match /^_/u                                                    @typescript-eslint/no-unused-vars
  131:52  error  Delete `␍`                                                                                                                             prettier/prettier
  132:1   error  Delete `······␍`                                                                                                                       prettier/prettier
  133:25  error  Delete `␍`                                                                                                                             prettier/prettier
  134:37  error  Delete `␍`                                                                                                                             prettier/prettier
  135:1   error  Delete `␍`                                                                                                                             prettier/prettier
  136:49  error  Delete `␍`                                                                                                                             prettier/prettier
  137:22  error  Delete `␍`                                                                                                                             prettier/prettier
  138:59  error  Delete `␍`                                                                                                                             prettier/prettier
  139:19  error  Delete `␍`                                                                                                                             prettier/prettier
  140:6   error  Delete `␍`                                                                                                                             prettier/prettier
  141:4   error  Delete `␍`                                                                                                                             prettier/prettier
  142:1   error  Delete `␍`                                                                                                                             prettier/prettier
  143:6   error  Delete `␍`                                                                                                                             prettier/prettier
  144:14  error  Delete `␍`                                                                                                                             prettier/prettier
  145:6   error  Delete `␍`                                                                                                                             prettier/prettier
  146:23  error  Delete `␍`                                                                                                                             prettier/prettier
  147:31  error  Delete `␍`                                                                                                                             prettier/prettier
  148:44  error  Delete `␍`                                                                                                                             prettier/prettier
  149:4   error  Delete `␍`                                                                                                                             prettier/prettier
  150:1   error  Delete `␍`                                                                                                                             prettier/prettier
  151:6   error  Delete `␍`                                                                                                                             prettier/prettier
  152:18  error  Delete `␍`                                                                                                                             prettier/prettier
  153:6   error  Delete `␍`                                                                                                                             prettier/prettier
  154:35  error  Delete `␍`                                                                                                                             prettier/prettier
  155:35  error  Delete `␍`                                                                                                                             prettier/prettier
  156:33  error  Delete `␍`                                                                                                                             prettier/prettier
  157:4   error  Delete `␍`                                                                                                                             prettier/prettier
  158:1   error  Delete `␍`                                                                                                                             prettier/prettier
  159:6   error  Delete `␍`                                                                                                                             prettier/prettier
  160:18  error  Delete `␍`                                                                                                                             prettier/prettier
  161:6   error  Delete `␍`                                                                                                                             prettier/prettier
  162:41  error  Delete `␍`                                                                                                                             prettier/prettier
  163:35  error  Delete `␍`                                                                                                                             prettier/prettier
  164:53  error  Delete `␍`                                                                                                                             prettier/prettier
  165:4   error  Delete `␍`                                                                                                                             prettier/prettier
  166:1   error  Delete `␍`                                                                                                                             prettier/prettier
  167:6   error  Delete `␍`                                                                                                                             prettier/prettier
  168:18  error  Delete `␍`                                                                                                                             prettier/prettier
  169:6   error  Delete `␍`                                                                                                                             prettier/prettier
  170:47  error  Delete `␍`                                                                                                                             prettier/prettier
  171:35  error  Delete `␍`                                                                                                                             prettier/prettier
  172:62  error  Delete `␍`                                                                                                                             prettier/prettier
  173:4   error  Delete `␍`                                                                                                                             prettier/prettier
  174:1   error  Delete `␍`                                                                                                                             prettier/prettier
  175:6   error  Delete `␍`                                                                                                                             prettier/prettier
  176:18  error  Delete `␍`                                                                                                                             prettier/prettier
  177:6   error  Delete `␍`                                                                                                                             prettier/prettier
  178:53  error  Delete `␍`                                                                                                                             prettier/prettier
  179:35  error  Delete `␍`                                                                                                                             prettier/prettier
  180:43  error  Replace `␍⏎······token?.permissions?.includes(permission)␍⏎····);␍` with `token?.permissions?.includes(permission));`                  prettier/prettier
  183:4   error  Delete `␍`                                                                                                                             prettier/prettier
  184:1   error  Delete `␍`                                                                                                                             prettier/prettier
  185:6   error  Delete `␍`                                                                                                                             prettier/prettier
  186:18  error  Delete `␍`                                                                                                                             prettier/prettier
  187:6   error  Delete `␍`                                                                                                                             prettier/prettier
  188:54  error  Delete `␍`                                                                                                                             prettier/prettier
  189:35  error  Delete `␍`                                                                                                                             prettier/prettier
  190:44  error  Replace `␍⏎······token?.permissions?.includes(permission)␍⏎····);␍` with `token?.permissions?.includes(permission));`                  prettier/prettier
  193:4   error  Delete `␍`                                                                                                                             prettier/prettier
  194:1   error  Delete `␍`                                                                                                                             prettier/prettier
  195:6   error  Delete `␍`                                                                                                                             prettier/prettier
  196:16  error  Delete `␍`                                                                                                                             prettier/prettier
  197:6   error  Delete `␍`                                                                                                                             prettier/prettier
  198:38  error  Delete `␍`                                                                                                                             prettier/prettier
  199:35  error  Delete `␍`                                                                                                                             prettier/prettier
  200:28  error  Delete `␍`                                                                                                                             prettier/prettier
  201:4   error  Delete `␍`                                                                                                                             prettier/prettier
  202:1   error  Delete `␍`                                                                                                                             prettier/prettier
  203:6   error  Delete `␍`                                                                                                                             prettier/prettier
  204:19  error  Delete `␍`                                                                                                                             prettier/prettier
  205:6   error  Delete `␍`                                                                                                                             prettier/prettier
  206:47  error  Delete `␍`                                                                                                                             prettier/prettier
  207:35  error  Delete `␍`                                                                                                                             prettier/prettier
  208:44  error  Replace `␍⏎···········token?.tenants?.includes(tenantId)·||·␍⏎···········false;␍` with `token?.tenants?.includes(tenantId)·||·false;`  prettier/prettier
  211:4   error  Delete `␍`                                                                                                                             prettier/prettier
  212:2   error  Delete `␍⏎␍`                                                                                                                           prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\core\services\firebase-auth.service.ts
    1:52   error    Delete `␍`                                                                                                                                       prettier/prettier
    2:9    error    Delete `␍`                                                                                                                                       prettier/prettier
    3:8    error    Delete `␍`                                                                                                                                       prettier/prettier
    4:22   error    Delete `␍`                                                                                                                                       prettier/prettier
    5:22   error    Delete `␍`                                                                                                                                       prettier/prettier
    6:19   error    Delete `␍`                                                                                                                                       prettier/prettier
    7:22   error    Delete `␍`                                                                                                                                       prettier/prettier
    8:30   error    Delete `␍`                                                                                                                                       prettier/prettier
    9:34   error    Delete `␍`                                                                                                                                       prettier/prettier
   10:11   error    Delete `␍`                                                                                                                                       prettier/prettier
   11:8    error    Delete `␍`                                                                                                                                       prettier/prettier
   12:11   error    Delete `␍`                                                                                                                                       prettier/prettier
   13:8    error    Delete `␍`                                                                                                                                       prettier/prettier
   14:18   error    Delete `␍`                                                                                                                                       prettier/prettier
   15:26   error    Delete `␍`                                                                                                                                       prettier/prettier
   16:16   error    Delete `␍`                                                                                                                                       prettier/prettier
   17:29   error    Delete `␍`                                                                                                                                       prettier/prettier
   18:28   error    'ITokenService' is defined but never used. Allowed unused vars must match /^_/u                                                                  @typescript-eslint/no-unused-vars
   18:63   error    Delete `␍`                                                                                                                                       prettier/prettier
   19:48   error    Delete `␍`                                                                                                                                       prettier/prettier
   20:1    error    `@angular/router` import should occur before import of `@delon/auth`                                                                             import/order
   20:42   error    Delete `␍`                                                                                                                                       prettier/prettier
   21:74   error    Delete `␍`                                                                                                                                       prettier/prettier
   22:1    error    There should be at least one empty line between import groups                                                                                    import/order
   22:66   error    Delete `␍`                                                                                                                                       prettier/prettier
   23:128  error    Delete `␍`                                                                                                                                       prettier/prettier
   24:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   25:4    error    Delete `␍`                                                                                                                                       prettier/prettier
   26:17   error    Delete `␍`                                                                                                                                       prettier/prettier
   27:44   error    Delete `␍`                                                                                                                                       prettier/prettier
   28:4    error    Delete `␍`                                                                                                                                       prettier/prettier
   29:36   error    Delete `␍`                                                                                                                                       prettier/prettier
   30:35   error    Delete `␍`                                                                                                                                       prettier/prettier
   31:31   error    Delete `␍`                                                                                                                                       prettier/prettier
   32:51   error    Delete `␍`                                                                                                                                       prettier/prettier
   33:46   error    Delete `␍`                                                                                                                                       prettier/prettier
   34:35   error    Delete `␍`                                                                                                                                       prettier/prettier
   35:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   36:23   error    Delete `␍`                                                                                                                                       prettier/prettier
   37:52   error    Delete `␍`                                                                                                                                       prettier/prettier
   38:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   39:26   error    Delete `␍`                                                                                                                                       prettier/prettier
   40:60   error    Delete `␍`                                                                                                                                       prettier/prettier
   41:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   42:10   error    Delete `␍`                                                                                                                                       prettier/prettier
   43:104  error    Delete `␍`                                                                                                                                       prettier/prettier
   44:53   error    Delete `␍`                                                                                                                                       prettier/prettier
   45:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   46:11   error    Delete `␍`                                                                                                                                       prettier/prettier
   47:83   error    Delete `␍`                                                                                                                                       prettier/prettier
   48:55   error    Delete `␍`                                                                                                                                       prettier/prettier
   49:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   50:18   error    Delete `␍`                                                                                                                                       prettier/prettier
   51:41   error    Delete `␍`                                                                                                                                       prettier/prettier
   52:27   error    Delete `␍`                                                                                                                                       prettier/prettier
   53:16   error    Delete `␍`                                                                                                                                       prettier/prettier
   54:34   error    Delete `␍`                                                                                                                                       prettier/prettier
   55:4    error    Delete `␍`                                                                                                                                       prettier/prettier
   56:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   57:22   error    Delete `␍`                                                                                                                                       prettier/prettier
   58:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   59:6    error    Delete `␍`                                                                                                                                       prettier/prettier
   60:21   error    Delete `␍`                                                                                                                                       prettier/prettier
   61:6    error    Delete `␍`                                                                                                                                       prettier/prettier
   62:59   error    Delete `␍`                                                                                                                                       prettier/prettier
   63:66   error    Delete `␍`                                                                                                                                       prettier/prettier
   64:1    error    Delete `····␍`                                                                                                                                   prettier/prettier
   65:47   error    Delete `␍`                                                                                                                                       prettier/prettier
   66:34   error    Delete `␍`                                                                                                                                       prettier/prettier
   67:32   error    Delete `␍`                                                                                                                                       prettier/prettier
   68:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   69:77   error    Delete `␍`                                                                                                                                       prettier/prettier
   70:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   71:57   error    Delete `␍`                                                                                                                                       prettier/prettier
   72:62   error    Delete `␍`                                                                                                                                       prettier/prettier
   73:74   error    Delete `␍`                                                                                                                                       prettier/prettier
   74:56   error    Delete `␍`                                                                                                                                       prettier/prettier
   75:7    error    Delete `␍`                                                                                                                                       prettier/prettier
   76:4    error    Delete `␍`                                                                                                                                       prettier/prettier
   77:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   78:6    error    Delete `␍`                                                                                                                                       prettier/prettier
   79:15   error    Delete `␍`                                                                                                                                       prettier/prettier
   80:6    error    Delete `␍`                                                                                                                                       prettier/prettier
   81:59   error    Delete `␍`                                                                                                                                       prettier/prettier
   82:66   error    Delete `␍`                                                                                                                                       prettier/prettier
   83:1    error    Delete `····␍`                                                                                                                                   prettier/prettier
   84:47   error    Delete `␍`                                                                                                                                       prettier/prettier
   85:37   error    Delete `␍`                                                                                                                                       prettier/prettier
   86:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   87:77   error    Delete `␍`                                                                                                                                       prettier/prettier
   88:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   89:57   error    Delete `␍`                                                                                                                                       prettier/prettier
   90:62   error    Delete `␍`                                                                                                                                       prettier/prettier
   91:74   error    Delete `␍`                                                                                                                                       prettier/prettier
   92:56   error    Delete `␍`                                                                                                                                       prettier/prettier
   93:7    error    Delete `␍`                                                                                                                                       prettier/prettier
   94:4    error    Delete `␍`                                                                                                                                       prettier/prettier
   95:1    error    Delete `␍`                                                                                                                                       prettier/prettier
   96:6    error    Delete `␍`                                                                                                                                       prettier/prettier
   97:23   error    Delete `␍`                                                                                                                                       prettier/prettier
   98:6    error    Delete `␍`                                                                                                                                       prettier/prettier
   99:78   error    Delete `␍`                                                                                                                                       prettier/prettier
  100:66   error    Delete `␍`                                                                                                                                       prettier/prettier
  101:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  102:78   error    Delete `␍`                                                                                                                                       prettier/prettier
  103:42   error    Delete `␍`                                                                                                                                       prettier/prettier
  104:82   error    Delete `␍`                                                                                                                                       prettier/prettier
  105:56   error    Delete `␍`                                                                                                                                       prettier/prettier
  106:7    error    Delete `␍`                                                                                                                                       prettier/prettier
  107:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  108:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  109:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  110:23   error    Delete `␍`                                                                                                                                       prettier/prettier
  111:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  112:103  error    Delete `␍`                                                                                                                                       prettier/prettier
  113:66   error    Delete `␍`                                                                                                                                       prettier/prettier
  114:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  115:82   error    Delete `␍`                                                                                                                                       prettier/prettier
  116:32   error    Delete `␍`                                                                                                                                       prettier/prettier
  117:32   error    Delete `␍`                                                                                                                                       prettier/prettier
  118:46   error    Delete `␍`                                                                                                                                       prettier/prettier
  119:77   error    Replace `␍⏎············map(()·=>·credential.user)␍⏎··········);␍` with `map(()·=>·credential.user));`                                            prettier/prettier
  122:10   error    Delete `␍`                                                                                                                                       prettier/prettier
  123:36   error    Delete `␍`                                                                                                                                       prettier/prettier
  124:10   error    Delete `␍`                                                                                                                                       prettier/prettier
  125:82   error    Delete `␍`                                                                                                                                       prettier/prettier
  126:56   error    Delete `␍`                                                                                                                                       prettier/prettier
  127:7    error    Delete `␍`                                                                                                                                       prettier/prettier
  128:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  129:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  130:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  131:14   error    Delete `␍`                                                                                                                                       prettier/prettier
  132:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  133:55   error    Delete `␍`                                                                                                                                       prettier/prettier
  134:64   error    Delete `␍`                                                                                                                                       prettier/prettier
  135:59   error    Delete `␍`                                                                                                                                       prettier/prettier
  136:28   error    Delete `␍`                                                                                                                                       prettier/prettier
  137:57   error    Delete `␍`                                                                                                                                       prettier/prettier
  138:40   error    Delete `␍`                                                                                                                                       prettier/prettier
  139:9    error    Delete `␍`                                                                                                                                       prettier/prettier
  140:7    error    Delete `␍`                                                                                                                                       prettier/prettier
  141:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  142:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  143:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  144:8    error    Delete `␍`                                                                                                                                       prettier/prettier
  145:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  146:31   error    Delete `␍`                                                                                                                                       prettier/prettier
  147:63   error    Delete `␍`                                                                                                                                       prettier/prettier
  148:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  149:42   error    Delete `␍`                                                                                                                                       prettier/prettier
  150:18   error    Delete `␍`                                                                                                                                       prettier/prettier
  151:32   error    Delete `␍`                                                                                                                                       prettier/prettier
  152:35   error    Delete `␍`                                                                                                                                       prettier/prettier
  153:1    error    Delete `········␍`                                                                                                                               prettier/prettier
  154:19   error    Delete `␍`                                                                                                                                       prettier/prettier
  155:35   error    Delete `␍`                                                                                                                                       prettier/prettier
  156:1    error    Delete `········␍`                                                                                                                               prettier/prettier
  157:18   error    Delete `␍`                                                                                                                                       prettier/prettier
  158:29   error    Delete `␍`                                                                                                                                       prettier/prettier
  159:26   error    Delete `␍`                                                                                                                                       prettier/prettier
  160:32   error    Delete `␍`                                                                                                                                       prettier/prettier
  161:12   error    Delete `␍`                                                                                                                                       prettier/prettier
  162:1    error    Delete `········␍`                                                                                                                               prettier/prettier
  163:16   error    Delete `␍`                                                                                                                                       prettier/prettier
  164:71   error    Delete `␍`                                                                                                                                       prettier/prettier
  165:1    error    Delete `········␍`                                                                                                                               prettier/prettier
  166:18   error    Delete `␍`                                                                                                                                       prettier/prettier
  167:50   error    Delete `␍`                                                                                                                                       prettier/prettier
  168:1    error    Delete `········␍`                                                                                                                               prettier/prettier
  169:45   error    Delete `␍`                                                                                                                                       prettier/prettier
  170:10   error    Delete `␍`                                                                                                                                       prettier/prettier
  171:28   error    Delete `␍`                                                                                                                                       prettier/prettier
  172:55   error    Delete `␍`                                                                                                                                       prettier/prettier
  173:61   error    Delete `␍`                                                                                                                                       prettier/prettier
  174:40   error    Delete `␍`                                                                                                                                       prettier/prettier
  175:9    error    Delete `␍`                                                                                                                                       prettier/prettier
  176:7    error    Delete `␍`                                                                                                                                       prettier/prettier
  177:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  178:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  179:26   error    Delete `␍`                                                                                                                                       prettier/prettier
  180:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  181:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  182:19   error    Delete `␍`                                                                                                                                       prettier/prettier
  183:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  184:64   error    Delete `␍`                                                                                                                                       prettier/prettier
  185:34   error    Delete `␍`                                                                                                                                       prettier/prettier
  186:23   error    Delete `␍`                                                                                                                                       prettier/prettier
  187:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  188:65   error    Delete `␍`                                                                                                                                       prettier/prettier
  189:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  190:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  191:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  192:42   error    Delete `␍`                                                                                                                                       prettier/prettier
  193:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  194:54   warning  Unexpected any. Specify a different type                                                                                                         @typescript-eslint/no-explicit-any
  194:60   error    Delete `␍`                                                                                                                                       prettier/prettier
  195:34   error    Delete `␍`                                                                                                                                       prettier/prettier
  196:23   error    Delete `␍`                                                                                                                                       prettier/prettier
  197:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  198:71   error    Delete `␍`                                                                                                                                       prettier/prettier
  199:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  200:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  201:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  202:16   error    Delete `␍`                                                                                                                                       prettier/prettier
  203:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  204:43   error    Delete `␍`                                                                                                                                       prettier/prettier
  205:49   error    Delete `␍`                                                                                                                                       prettier/prettier
  206:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  207:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  208:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  209:13   error    Delete `␍`                                                                                                                                       prettier/prettier
  210:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  211:34   error    Delete `␍`                                                                                                                                       prettier/prettier
  212:34   error    Delete `␍`                                                                                                                                       prettier/prettier
  213:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  214:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  215:22   error    Delete `␍`                                                                                                                                       prettier/prettier
  216:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  217:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  218:12   error    Delete `␍`                                                                                                                                       prettier/prettier
  219:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  220:74   error    Delete `␍`                                                                                                                                       prettier/prettier
  221:69   error    Delete `␍`                                                                                                                                       prettier/prettier
  222:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  223:23   error    Delete `␍`                                                                                                                                       prettier/prettier
  224:45   error    Delete `␍`                                                                                                                                       prettier/prettier
  225:25   error    Delete `␍`                                                                                                                                       prettier/prettier
  226:47   error    Delete `␍`                                                                                                                                       prettier/prettier
  227:29   error    Delete `␍`                                                                                                                                       prettier/prettier
  228:60   error    Delete `␍`                                                                                                                                       prettier/prettier
  229:25   error    Delete `␍`                                                                                                                                       prettier/prettier
  230:23   error    Delete `␍`                                                                                                                                       prettier/prettier
  231:40   error    Delete `␍`                                                                                                                                       prettier/prettier
  232:44   error    Delete `␍`                                                                                                                                       prettier/prettier
  233:45   error    Delete `␍`                                                                                                                                       prettier/prettier
  234:45   error    Delete `␍`                                                                                                                                       prettier/prettier
  235:25   error    Delete `␍`                                                                                                                                       prettier/prettier
  236:47   error    Delete `␍`                                                                                                                                       prettier/prettier
  237:63   error    Delete `␍`                                                                                                                                       prettier/prettier
  238:55   error    Delete `␍`                                                                                                                                       prettier/prettier
  239:55   error    Delete `␍`                                                                                                                                       prettier/prettier
  240:63   error    Delete `␍`                                                                                                                                       prettier/prettier
  241:54   error    Delete `␍`                                                                                                                                       prettier/prettier
  242:21   error    Delete `␍`                                                                                                                                       prettier/prettier
  243:39   error    Delete `␍`                                                                                                                                       prettier/prettier
  244:47   error    Delete `␍`                                                                                                                                       prettier/prettier
  245:57   error    Delete `␍`                                                                                                                                       prettier/prettier
  246:21   error    Delete `␍`                                                                                                                                       prettier/prettier
  247:25   error    Delete `␍`                                                                                                                                       prettier/prettier
  248:9    error    Delete `␍`                                                                                                                                       prettier/prettier
  249:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  250:41   error    Delete `␍`                                                                                                                                       prettier/prettier
  251:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  252:17   error    Delete `␍`                                                                                                                                       prettier/prettier
  253:30   error    Delete `␍`                                                                                                                                       prettier/prettier
  254:46   error    Delete `␍`                                                                                                                                       prettier/prettier
  255:27   error    Delete `␍`                                                                                                                                       prettier/prettier
  256:31   error    Delete `␍`                                                                                                                                       prettier/prettier
  257:23   error    Delete `␍`                                                                                                                                       prettier/prettier
  258:36   error    Delete `␍`                                                                                                                                       prettier/prettier
  259:10   error    Delete `␍`                                                                                                                                       prettier/prettier
  260:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  261:16   error    Delete `␍`                                                                                                                                       prettier/prettier
  262:27   error    Delete `␍`                                                                                                                                       prettier/prettier
  263:23   error    Delete `␍`                                                                                                                                       prettier/prettier
  264:31   error    Delete `␍`                                                                                                                                       prettier/prettier
  265:23   error    Delete `␍`                                                                                                                                       prettier/prettier
  266:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  267:10   error    Delete `␍`                                                                                                                                       prettier/prettier
  268:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  269:14   error    Delete `␍`                                                                                                                                       prettier/prettier
  270:67   error    Delete `␍`                                                                                                                                       prettier/prettier
  271:8    error    Delete `␍`                                                                                                                                       prettier/prettier
  272:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  273:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  274:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  275:12   error    Delete `␍`                                                                                                                                       prettier/prettier
  276:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  277:35   warning  Unexpected any. Specify a different type                                                                                                         @typescript-eslint/no-explicit-any
  277:60   error    Delete `␍`                                                                                                                                       prettier/prettier
  278:51   error    Delete `␍`                                                                                                                                       prettier/prettier
  279:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  280:26   error    Delete `␍`                                                                                                                                       prettier/prettier
  281:26   error    Delete `␍`                                                                                                                                       prettier/prettier
  282:34   error    Delete `␍`                                                                                                                                       prettier/prettier
  283:28   error    Delete `␍`                                                                                                                                       prettier/prettier
  284:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  285:34   error    Delete `␍`                                                                                                                                       prettier/prettier
  286:26   error    Delete `␍`                                                                                                                                       prettier/prettier
  287:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  288:33   error    Delete `␍`                                                                                                                                       prettier/prettier
  289:32   error    Delete `␍`                                                                                                                                       prettier/prettier
  290:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  291:33   error    Delete `␍`                                                                                                                                       prettier/prettier
  292:28   error    Delete `␍`                                                                                                                                       prettier/prettier
  293:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  294:40   error    Delete `␍`                                                                                                                                       prettier/prettier
  295:29   error    Delete `␍`                                                                                                                                       prettier/prettier
  296:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  297:33   error    Delete `␍`                                                                                                                                       prettier/prettier
  298:32   error    Delete `␍`                                                                                                                                       prettier/prettier
  299:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  300:42   error    Delete `␍`                                                                                                                                       prettier/prettier
  301:28   error    Delete `␍`                                                                                                                                       prettier/prettier
  302:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  303:37   error    Delete `␍`                                                                                                                                       prettier/prettier
  304:34   error    Delete `␍`                                                                                                                                       prettier/prettier
  305:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  306:40   error    Delete `␍`                                                                                                                                       prettier/prettier
  307:32   error    Delete `␍`                                                                                                                                       prettier/prettier
  308:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  309:33   error    Delete `␍`                                                                                                                                       prettier/prettier
  310:38   error    Delete `␍`                                                                                                                                       prettier/prettier
  311:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  312:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  313:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  314:14   error    Delete `␍`                                                                                                                                       prettier/prettier
  315:25   error    Delete `␍`                                                                                                                                       prettier/prettier
  316:26   error    Delete `␍`                                                                                                                                       prettier/prettier
  317:29   error    Delete `␍`                                                                                                                                       prettier/prettier
  318:21   error    Delete `␍`                                                                                                                                       prettier/prettier
  319:8    error    Delete `␍`                                                                                                                                       prettier/prettier
  320:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  321:12   error    Delete `␍`                                                                                                                                       prettier/prettier
  322:57   error    Delete `␍`                                                                                                                                       prettier/prettier
  323:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  324:49   error    Delete `␍`                                                                                                                                       prettier/prettier
  325:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  326:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  327:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  328:19   error    Delete `␍`                                                                                                                                       prettier/prettier
  329:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  330:35   error    Delete `␍`                                                                                                                                       prettier/prettier
  331:18   error    Replace `.pipe(␍` with `⏎······.pipe(`                                                                                                           prettier/prettier
  332:1    error    Replace `······switchMap(token·=>·{␍` with `········switchMap(token·=>·{`                                                                        prettier/prettier
  333:1    error    Replace `········if·(!token)·{␍` with `··········if·(!token)·{`                                                                                  prettier/prettier
  334:1    error    Replace `··········return·of(null);␍` with `············return·of(null);`                                                                        prettier/prettier
  335:1    error    Replace `········}␍` with `··········}`                                                                                                          prettier/prettier
  336:9    error    Replace `return·this.getIdTokenResult();␍` with `··return·this.getIdTokenResult();`                                                              prettier/prettier
  337:1    error    Replace `······})␍` with `········})`                                                                                                            prettier/prettier
  338:1    error    Replace `····).subscribe(result·=>·{␍` with `······)⏎······.subscribe(result·=>·{`                                                               prettier/prettier
  339:1    error    Replace `······if·(result)·{␍` with `········if·(result)·{`                                                                                      prettier/prettier
  340:1    error    Replace `········const·tokenModel:·FirebaseTokenModel·=·{␍` with `··········const·tokenModel:·FirebaseTokenModel·=·{`                            prettier/prettier
  341:1    error    Replace `··········token:·result.token,␍` with `············token:·result.token,`                                                                prettier/prettier
  342:1    error    Replace `··········expired:·new·Date(result.expirationTime).getTime(),␍` with `············expired:·new·Date(result.expirationTime).getTime(),`  prettier/prettier
  343:1    error    Replace `··········...result.claims␍` with `············...result.claims`                                                                        prettier/prettier
  344:9    error    Replace `};␍` with `··};`                                                                                                                        prettier/prettier
  345:1    error    Replace `········this.tokenService.set(tokenModel);␍` with `··········this.tokenService.set(tokenModel);`                                        prettier/prettier
  346:1    error    Replace `······}␍` with `········}`                                                                                                              prettier/prettier
  347:1    error    Replace `····});␍` with `······});`                                                                                                              prettier/prettier
  348:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  349:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  350:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  351:14   error    Delete `␍`                                                                                                                                       prettier/prettier
  352:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  353:42   error    Delete `␍`                                                                                                                                       prettier/prettier
  354:35   error    Delete `␍`                                                                                                                                       prettier/prettier
  355:18   error    Delete `␍`                                                                                                                                       prettier/prettier
  356:69   error    Delete `␍`                                                                                                                                       prettier/prettier
  357:15   error    Delete `␍`                                                                                                                                       prettier/prettier
  358:71   error    Delete `␍`                                                                                                                                       prettier/prettier
  359:8    error    Delete `␍`                                                                                                                                       prettier/prettier
  360:8    error    Delete `␍`                                                                                                                                       prettier/prettier
  361:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  362:1    error    Delete `␍`                                                                                                                                       prettier/prettier
  363:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  364:12   error    Delete `␍`                                                                                                                                       prettier/prettier
  365:6    error    Delete `␍`                                                                                                                                       prettier/prettier
  366:58   error    Delete `␍`                                                                                                                                       prettier/prettier
  367:40   error    Delete `␍`                                                                                                                                       prettier/prettier
  368:49   error    Delete `␍`                                                                                                                                       prettier/prettier
  369:4    error    Delete `␍`                                                                                                                                       prettier/prettier
  370:2    error    Delete `␍⏎␍`                                                                                                                                     prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\core\services\firebase-error-handler.service.ts
    1:44  error    Delete `␍`                                                                                                                                                                               prettier/prettier
    2:51  error    Delete `␍`                                                                                                                                                                               prettier/prettier
    3:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
    4:4   error    Delete `␍`                                                                                                                                                                               prettier/prettier
    5:19  error    Delete `␍`                                                                                                                                                                               prettier/prettier
    6:4   error    Delete `␍`                                                                                                                                                                               prettier/prettier
    7:37  error    Delete `␍`                                                                                                                                                                               prettier/prettier
    8:14  error    Delete `␍`                                                                                                                                                                               prettier/prettier
    9:16  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   10:1   error    Delete `··␍`                                                                                                                                                                             prettier/prettier
   11:16  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   12:19  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   13:1   error    Delete `··␍`                                                                                                                                                                             prettier/prettier
   14:20  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   15:23  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   16:1   error    Delete `··␍`                                                                                                                                                                             prettier/prettier
   17:14  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   18:42  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   19:1   error    Delete `··␍`                                                                                                                                                                             prettier/prettier
   20:15  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   21:28  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   22:2   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   23:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   24:4   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   25:19  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   26:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   27:4   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   28:36  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   29:36  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   30:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   31:20  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   32:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   33:17  warning  Unexpected any. Specify a different type                                                                                                                                                 @typescript-eslint/no-explicit-any
   33:42  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   34:42  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   35:46  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   36:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   37:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   38:12  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   39:13  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   40:23  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   41:40  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   42:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   43:24  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   44:7   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   45:4   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   46:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   47:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   48:22  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   49:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   50:73  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   51:84  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   52:26  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   53:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   54:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   55:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   56:42  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   57:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   58:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   59:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   60:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   61:44  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   62:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   63:30  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   64:35  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   65:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   66:43  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   67:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   68:30  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   69:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   70:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   71:34  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   72:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   73:37  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   74:35  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   75:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   76:45  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   77:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   78:30  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   79:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   80:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   81:40  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   82:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   83:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   84:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   85:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   86:40  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   87:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   88:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   89:28  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   90:38  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   91:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   92:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   93:41  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   94:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
   95:37  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   96:32  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   97:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   98:35  error    Delete `␍`                                                                                                                                                                               prettier/prettier
   99:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  100:30  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  101:35  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  102:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  103:38  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  104:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  105:40  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  106:32  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  107:26  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  108:35  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  109:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  110:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  111:26  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  112:39  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  113:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  114:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  115:37  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  116:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  117:24  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  118:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  119:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  120:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  121:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  122:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  123:26  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  124:34  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  125:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  126:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  127:42  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  128:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  129:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  130:30  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  131:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  132:30  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  133:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  134:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  135:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  136:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  137:32  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  138:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  139:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  140:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  141:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  142:32  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  143:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  144:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  145:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  146:39  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  147:30  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  148:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  149:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  150:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  151:39  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  152:30  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  153:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  154:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  155:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  156:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  157:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  158:35  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  159:32  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  160:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  161:37  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  162:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  163:57  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  164:42  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  165:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  166:38  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  167:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  168:42  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  169:36  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  170:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  171:35  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  172:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  173:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  174:26  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  175:36  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  176:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  177:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  178:37  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  179:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  180:32  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  181:35  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  182:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  183:34  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  184:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  185:28  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  186:39  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  187:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  188:34  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  189:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  190:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  191:26  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  192:30  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  193:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  194:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  195:40  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  196:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  197:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  198:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  199:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  200:33  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  201:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  202:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  203:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  204:27  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  205:40  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  206:8   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  207:7   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  208:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  209:44  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  210:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  211:21  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  212:15  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  213:26  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  214:32  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  215:21  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  216:9   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  217:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  218:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  219:23  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  220:13  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  221:24  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  222:30  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  223:42  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  224:25  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  225:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  226:7   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  227:4   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  228:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  229:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  230:15  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  231:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  232:26  warning  Unexpected any. Specify a different type                                                                                                                                                 @typescript-eslint/no-explicit-any
  232:40  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  233:37  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  234:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  235:4   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  236:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  237:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  238:23  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  239:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  240:25  warning  Unexpected any. Specify a different type                                                                                                                                                 @typescript-eslint/no-explicit-any
  240:39  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  241:37  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  242:33  error    Replace `␍⏎······?·`${info.userMessage}\n${info.suggestedAction}`␍⏎······:·info.userMessage;␍` with `?·`${info.userMessage}\n${info.suggestedAction}`·:·info.userMessage;`               prettier/prettier
  245:4   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  246:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  247:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  248:14  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  249:6   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  250:19  warning  Unexpected any. Specify a different type                                                                                                                                                 @typescript-eslint/no-explicit-any
  250:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  251:37  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  252:1   error    Delete `····␍`                                                                                                                                                                           prettier/prettier
  253:67  error    Replace `␍⏎······················info.severity·===·'warning'·?·console.warn·:·␍⏎······················console.info;␍` with `info.severity·===·'warning'·?·console.warn·:·console.info;`  prettier/prettier
  256:1   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  257:36  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  258:23  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  259:29  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  260:37  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  261:31  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  262:44  error    Delete `␍`                                                                                                                                                                               prettier/prettier
  263:8   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  264:4   error    Delete `␍`                                                                                                                                                                               prettier/prettier
  265:2   error    Delete `␍⏎␍`                                                                                                                                                                             prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\core\services\multi-tenant-auth.service.ts
    1:52  error  Delete `␍`                                                                                                                                                        prettier/prettier
    2:71  error  Delete `␍`                                                                                                                                                        prettier/prettier
    3:1   error  There should be at least one empty line between import groups                                                                                                     import/order
    3:48  error  Delete `␍`                                                                                                                                                        prettier/prettier
    4:98  error  Delete `␍`                                                                                                                                                        prettier/prettier
    5:69  error  Delete `␍`                                                                                                                                                        prettier/prettier
    6:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
    7:4   error  Delete `␍`                                                                                                                                                        prettier/prettier
    8:11  error  Delete `␍`                                                                                                                                                        prettier/prettier
    9:39  error  Delete `␍`                                                                                                                                                        prettier/prettier
   10:4   error  Delete `␍`                                                                                                                                                        prettier/prettier
   11:36  error  Delete `␍`                                                                                                                                                        prettier/prettier
   12:38  error  Delete `␍`                                                                                                                                                        prettier/prettier
   13:31  error  Delete `␍`                                                                                                                                                        prettier/prettier
   14:51  error  Delete `␍`                                                                                                                                                        prettier/prettier
   15:59  error  Delete `␍`                                                                                                                                                        prettier/prettier
   16:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   17:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
   18:1   error  Expected 1 lines after block description                                                                                                                          jsdoc/tag-lines
   18:16  error  Delete `␍`                                                                                                                                                        prettier/prettier
   19:28  error  Delete `␍`                                                                                                                                                        prettier/prettier
   20:24  error  Delete `␍`                                                                                                                                                        prettier/prettier
   21:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
   22:74  error  Delete `␍`                                                                                                                                                        prettier/prettier
   23:48  error  Delete `␍`                                                                                                                                                        prettier/prettier
   24:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   25:22  error  Delete `␍`                                                                                                                                                        prettier/prettier
   26:85  error  Delete `␍`                                                                                                                                                        prettier/prettier
   27:34  error  Delete `␍`                                                                                                                                                        prettier/prettier
   28:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   29:34  error  Delete `␍`                                                                                                                                                        prettier/prettier
   30:50  error  Delete `␍`                                                                                                                                                        prettier/prettier
   31:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   32:18  error  Delete `␍`                                                                                                                                                        prettier/prettier
   33:58  error  Delete `␍`                                                                                                                                                        prettier/prettier
   34:58  error  Delete `␍`                                                                                                                                                        prettier/prettier
   35:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   36:59  error  Delete `␍`                                                                                                                                                        prettier/prettier
   37:37  error  Delete `␍`                                                                                                                                                        prettier/prettier
   38:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
   39:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   40:27  error  Delete `␍`                                                                                                                                                        prettier/prettier
   41:52  error  Delete `␍`                                                                                                                                                        prettier/prettier
   42:61  error  Delete `␍`                                                                                                                                                        prettier/prettier
   43:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   44:26  error  Delete `␍`                                                                                                                                                        prettier/prettier
   45:45  error  Delete `␍`                                                                                                                                                        prettier/prettier
   46:27  error  Delete `␍`                                                                                                                                                        prettier/prettier
   47:58  error  Delete `␍`                                                                                                                                                        prettier/prettier
   48:21  error  Delete `␍`                                                                                                                                                        prettier/prettier
   49:38  error  Delete `␍`                                                                                                                                                        prettier/prettier
   50:43  error  Delete `␍`                                                                                                                                                        prettier/prettier
   51:33  error  Delete `␍`                                                                                                                                                        prettier/prettier
   52:45  error  Delete `␍`                                                                                                                                                        prettier/prettier
   53:45  error  Delete `␍`                                                                                                                                                        prettier/prettier
   54:61  error  Delete `␍`                                                                                                                                                        prettier/prettier
   55:23  error  Delete `␍`                                                                                                                                                        prettier/prettier
   56:7   error  Delete `␍`                                                                                                                                                        prettier/prettier
   57:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   58:39  error  Delete `␍`                                                                                                                                                        prettier/prettier
   59:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   60:66  error  Delete `␍`                                                                                                                                                        prettier/prettier
   61:4   error  Delete `␍`                                                                                                                                                        prettier/prettier
   62:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   63:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
   64:1   error  Expected 1 lines after block description                                                                                                                          jsdoc/tag-lines
   64:10  error  Delete `␍`                                                                                                                                                        prettier/prettier
   65:29  error  Delete `␍`                                                                                                                                                        prettier/prettier
   66:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
   67:56  error  Delete `␍`                                                                                                                                                        prettier/prettier
   68:59  error  Delete `␍`                                                                                                                                                        prettier/prettier
   69:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   70:40  error  Delete `␍`                                                                                                                                                        prettier/prettier
   71:17  error  Delete `␍`                                                                                                                                                        prettier/prettier
   72:30  error  Delete `␍`                                                                                                                                                        prettier/prettier
   73:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
   74:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   75:25  error  Delete `␍`                                                                                                                                                        prettier/prettier
   76:50  error  Delete `␍`                                                                                                                                                        prettier/prettier
   77:28  error  Replace `result.claims['tenants']·as·string[]·||·[];␍` with `(result.claims['tenants']·as·string[])·||·[];`                                                       prettier/prettier
   78:65  error  Delete `␍`                                                                                                                                                        prettier/prettier
   79:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   80:28  error  Delete `␍`                                                                                                                                                        prettier/prettier
   81:47  error  Replace `␍⏎······?·[currentTenantId,·...allowedTenants]·␍⏎······:·allowedTenants;␍` with `?·[currentTenantId,·...allowedTenants]·:·allowedTenants;`               prettier/prettier
   84:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   85:49  error  Delete `␍`                                                                                                                                                        prettier/prettier
   86:49  error  Delete `␍`                                                                                                                                                        prettier/prettier
   87:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
   88:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   89:18  error  Delete `␍`                                                                                                                                                        prettier/prettier
   90:54  error  Delete `␍`                                                                                                                                                        prettier/prettier
   91:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   92:50  error  Delete `␍`                                                                                                                                                        prettier/prettier
   93:50  error  Delete `␍`                                                                                                                                                        prettier/prettier
   94:53  error  Delete `␍`                                                                                                                                                        prettier/prettier
   95:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
   96:19  error  Delete `␍`                                                                                                                                                        prettier/prettier
   97:45  error  Delete `␍`                                                                                                                                                        prettier/prettier
   98:23  error  Delete `␍`                                                                                                                                                        prettier/prettier
   99:61  error  Delete `␍`                                                                                                                                                        prettier/prettier
  100:21  error  Delete `␍`                                                                                                                                                        prettier/prettier
  101:38  error  Delete `␍`                                                                                                                                                        prettier/prettier
  102:43  error  Delete `␍`                                                                                                                                                        prettier/prettier
  103:16  error  Delete `␍`                                                                                                                                                        prettier/prettier
  104:56  error  Delete `␍`                                                                                                                                                        prettier/prettier
  105:48  error  Delete `␍`                                                                                                                                                        prettier/prettier
  106:64  error  Delete `␍`                                                                                                                                                        prettier/prettier
  107:26  error  Delete `␍`                                                                                                                                                        prettier/prettier
  108:7   error  Delete `␍`                                                                                                                                                        prettier/prettier
  109:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
  110:39  error  Delete `␍`                                                                                                                                                        prettier/prettier
  111:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
  112:60  error  Delete `␍`                                                                                                                                                        prettier/prettier
  113:4   error  Delete `␍`                                                                                                                                                        prettier/prettier
  114:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
  115:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
  116:15  error  Delete `␍`                                                                                                                                                        prettier/prettier
  117:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
  118:45  error  Delete `␍`                                                                                                                                                        prettier/prettier
  119:65  error  Delete `␍`                                                                                                                                                        prettier/prettier
  120:28  error  Delete `␍`                                                                                                                                                        prettier/prettier
  121:4   error  Delete `␍`                                                                                                                                                        prettier/prettier
  122:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
  123:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
  124:16  error  Delete `␍`                                                                                                                                                        prettier/prettier
  125:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
  126:34  error  Delete `␍`                                                                                                                                                        prettier/prettier
  127:65  error  Delete `␍`                                                                                                                                                        prettier/prettier
  128:45  error  Delete `␍`                                                                                                                                                        prettier/prettier
  129:42  error  Delete `␍`                                                                                                                                                        prettier/prettier
  130:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
  131:23  error  Delete `␍`                                                                                                                                                        prettier/prettier
  132:40  error  Replace `␍⏎······?·Array.from(new·Set([currentTenantId,·...tenants]))␍⏎······:·tenants;␍` with `?·Array.from(new·Set([currentTenantId,·...tenants]))·:·tenants;`  prettier/prettier
  135:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
  136:23  error  Delete `␍`                                                                                                                                                        prettier/prettier
  137:4   error  Delete `␍`                                                                                                                                                        prettier/prettier
  138:1   error  Delete `␍`                                                                                                                                                        prettier/prettier
  139:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
  140:17  error  Delete `␍`                                                                                                                                                        prettier/prettier
  141:6   error  Delete `␍`                                                                                                                                                        prettier/prettier
  142:47  error  Delete `␍`                                                                                                                                                        prettier/prettier
  143:56  error  Delete `␍`                                                                                                                                                        prettier/prettier
  144:4   error  Delete `␍`                                                                                                                                                        prettier/prettier
  145:2   error  Delete `␍⏎␍`                                                                                                                                                      prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\core\services\organization-context\organization-context.service.ts
   55:69  warning  `toPromise` is deprecated. Replaced with {@link firstValueFrom } and {@link lastValueFrom }. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise  @typescript-eslint/no-deprecated
  178:74  warning  `toPromise` is deprecated. Replaced with {@link firstValueFrom } and {@link lastValueFrom }. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise  @typescript-eslint/no-deprecated
  203:77  warning  `toPromise` is deprecated. Replaced with {@link firstValueFrom } and {@link lastValueFrom }. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise  @typescript-eslint/no-deprecated

C:\Users\user\Downloads\ng-alain-build\src\app\core\services\rbac.service.ts
    1:52  error  Delete `␍`                                                                        prettier/prettier
    2:43  error  Delete `␍`                                                                        prettier/prettier
    3:45  error  Delete `␍`                                                                        prettier/prettier
    4:1   error  There should be at least one empty line between import groups                     import/order
    4:50  error  Delete `␍`                                                                        prettier/prettier
    5:76  error  Delete `␍`                                                                        prettier/prettier
    6:1   error  Delete `␍`                                                                        prettier/prettier
    7:4   error  Delete `␍`                                                                        prettier/prettier
    8:8   error  Delete `␍`                                                                        prettier/prettier
    9:16  error  Delete `␍`                                                                        prettier/prettier
   10:4   error  Delete `␍`                                                                        prettier/prettier
   11:25  error  Delete `␍`                                                                        prettier/prettier
   12:11  error  Delete `␍`                                                                        prettier/prettier
   13:29  error  Delete `␍`                                                                        prettier/prettier
   14:31  error  Delete `␍`                                                                        prettier/prettier
   15:33  error  Delete `␍`                                                                        prettier/prettier
   16:1   error  Delete `··␍`                                                                      prettier/prettier
   17:10  error  Delete `␍`                                                                        prettier/prettier
   18:35  error  Delete `␍`                                                                        prettier/prettier
   19:37  error  Delete `␍`                                                                        prettier/prettier
   20:39  error  Delete `␍`                                                                        prettier/prettier
   21:1   error  Delete `··␍`                                                                      prettier/prettier
   22:10  error  Delete `␍`                                                                        prettier/prettier
   23:45  error  Delete `␍`                                                                        prettier/prettier
   24:47  error  Delete `␍`                                                                        prettier/prettier
   25:49  error  Delete `␍`                                                                        prettier/prettier
   26:1   error  Delete `··␍`                                                                      prettier/prettier
   27:10  error  Delete `␍`                                                                        prettier/prettier
   28:41  error  Delete `␍`                                                                        prettier/prettier
   29:43  error  Delete `␍`                                                                        prettier/prettier
   30:45  error  Delete `␍`                                                                        prettier/prettier
   31:1   error  Delete `··␍`                                                                      prettier/prettier
   32:10  error  Delete `␍`                                                                        prettier/prettier
   33:29  error  Delete `␍`                                                                        prettier/prettier
   34:31  error  Delete `␍`                                                                        prettier/prettier
   35:33  error  Delete `␍`                                                                        prettier/prettier
   36:1   error  Delete `··␍`                                                                      prettier/prettier
   37:10  error  Delete `␍`                                                                        prettier/prettier
   38:23  error  Delete `␍`                                                                        prettier/prettier
   39:39  error  Delete `␍`                                                                        prettier/prettier
   40:29  error  Delete `␍`                                                                        prettier/prettier
   41:1   error  Delete `··␍`                                                                      prettier/prettier
   42:8   error  Delete `␍`                                                                        prettier/prettier
   43:33  error  Delete `␍`                                                                        prettier/prettier
   44:36  error  Delete `␍`                                                                        prettier/prettier
   45:2   error  Delete `␍`                                                                        prettier/prettier
   46:1   error  Delete `␍`                                                                        prettier/prettier
   47:4   error  Delete `␍`                                                                        prettier/prettier
   48:8   error  Delete `␍`                                                                        prettier/prettier
   49:4   error  Delete `␍`                                                                        prettier/prettier
   50:19  error  Delete `␍`                                                                        prettier/prettier
   51:15  error  Delete `␍`                                                                        prettier/prettier
   52:19  error  Delete `␍`                                                                        prettier/prettier
   53:1   error  Delete `··␍`                                                                      prettier/prettier
   54:15  error  Delete `␍`                                                                        prettier/prettier
   55:19  error  Delete `␍`                                                                        prettier/prettier
   56:1   error  Delete `··␍`                                                                      prettier/prettier
   57:15  error  Delete `␍`                                                                        prettier/prettier
   58:23  error  Delete `␍`                                                                        prettier/prettier
   59:1   error  Delete `··␍`                                                                      prettier/prettier
   60:15  error  Delete `␍`                                                                        prettier/prettier
   61:17  error  Delete `␍`                                                                        prettier/prettier
   62:1   error  Delete `··␍`                                                                      prettier/prettier
   63:12  error  Delete `␍`                                                                        prettier/prettier
   64:20  error  Delete `␍`                                                                        prettier/prettier
   65:2   error  Delete `␍`                                                                        prettier/prettier
   66:1   error  Delete `␍`                                                                        prettier/prettier
   67:4   error  Delete `␍`                                                                        prettier/prettier
   68:39  error  Delete `␍`                                                                        prettier/prettier
   69:17  error  Delete `␍`                                                                        prettier/prettier
   70:4   error  Delete `␍`                                                                        prettier/prettier
   71:36  error  Delete `␍`                                                                        prettier/prettier
   72:27  error  Delete `␍`                                                                        prettier/prettier
   73:31  error  Delete `␍`                                                                        prettier/prettier
   74:65  error  Delete `␍`                                                                        prettier/prettier
   75:1   error  Delete `␍`                                                                        prettier/prettier
   76:22  error  Delete `␍`                                                                        prettier/prettier
   77:1   error  Delete `␍`                                                                        prettier/prettier
   78:6   error  Delete `␍`                                                                        prettier/prettier
   79:18  error  Delete `␍`                                                                        prettier/prettier
   80:6   error  Delete `␍`                                                                        prettier/prettier
   81:72  error  Delete `␍`                                                                        prettier/prettier
   82:27  error  Delete `␍`                                                                        prettier/prettier
   83:45  error  Delete `␍`                                                                        prettier/prettier
   84:67  error  Delete `␍`                                                                        prettier/prettier
   85:6   error  Delete `␍`                                                                        prettier/prettier
   86:1   error  Delete `····␍`                                                                    prettier/prettier
   87:23  error  Delete `␍`                                                                        prettier/prettier
   88:49  error  Delete `␍`                                                                        prettier/prettier
   89:60  error  Delete `␍`                                                                        prettier/prettier
   90:34  error  Delete `␍`                                                                        prettier/prettier
   91:7   error  Delete `␍`                                                                        prettier/prettier
   92:4   error  Delete `␍`                                                                        prettier/prettier
   93:1   error  Delete `␍`                                                                        prettier/prettier
   94:6   error  Delete `␍`                                                                        prettier/prettier
   95:18  error  Delete `␍`                                                                        prettier/prettier
   96:6   error  Delete `␍`                                                                        prettier/prettier
   97:33  error  Array type using 'T[]' is forbidden for non-simple types. Use 'Array<T>' instead  @typescript-eslint/array-type
   97:80  error  Delete `␍`                                                                        prettier/prettier
   98:14  error  Delete `␍`                                                                        prettier/prettier
   99:45  error  Delete `␍`                                                                        prettier/prettier
  100:83  error  Delete `␍`                                                                        prettier/prettier
  101:6   error  Delete `␍`                                                                        prettier/prettier
  102:1   error  Delete `····␍`                                                                    prettier/prettier
  103:49  error  Delete `␍`                                                                        prettier/prettier
  104:80  error  Delete `␍`                                                                        prettier/prettier
  105:34  error  Delete `␍`                                                                        prettier/prettier
  106:7   error  Delete `␍`                                                                        prettier/prettier
  107:4   error  Delete `␍`                                                                        prettier/prettier
  108:1   error  Delete `␍`                                                                        prettier/prettier
  109:6   error  Delete `␍`                                                                        prettier/prettier
  110:18  error  Delete `␍`                                                                        prettier/prettier
  111:6   error  Delete `␍`                                                                        prettier/prettier
  112:34  error  Array type using 'T[]' is forbidden for non-simple types. Use 'Array<T>' instead  @typescript-eslint/array-type
  112:81  error  Delete `␍`                                                                        prettier/prettier
  113:14  error  Delete `␍`                                                                        prettier/prettier
  114:45  error  Delete `␍`                                                                        prettier/prettier
  115:84  error  Delete `␍`                                                                        prettier/prettier
  116:6   error  Delete `␍`                                                                        prettier/prettier
  117:1   error  Delete `····␍`                                                                    prettier/prettier
  118:49  error  Delete `␍`                                                                        prettier/prettier
  119:81  error  Delete `␍`                                                                        prettier/prettier
  120:34  error  Delete `␍`                                                                        prettier/prettier
  121:7   error  Delete `␍`                                                                        prettier/prettier
  122:4   error  Delete `␍`                                                                        prettier/prettier
  123:1   error  Delete `␍`                                                                        prettier/prettier
  124:6   error  Delete `␍`                                                                        prettier/prettier
  125:20  error  Delete `␍`                                                                        prettier/prettier
  126:6   error  Delete `␍`                                                                        prettier/prettier
  127:35  error  Delete `␍`                                                                        prettier/prettier
  128:53  error  Delete `␍`                                                                        prettier/prettier
  129:37  error  Delete `␍`                                                                        prettier/prettier
  130:4   error  Delete `␍`                                                                        prettier/prettier
  131:1   error  Delete `␍`                                                                        prettier/prettier
  132:22  error  Delete `␍`                                                                        prettier/prettier
  133:1   error  Delete `␍`                                                                        prettier/prettier
  134:6   error  Delete `␍`                                                                        prettier/prettier
  135:18  error  Delete `␍`                                                                        prettier/prettier
  136:6   error  Delete `␍`                                                                        prettier/prettier
  137:54  error  Delete `␍`                                                                        prettier/prettier
  138:14  error  Delete `␍`                                                                        prettier/prettier
  139:45  error  Delete `␍`                                                                        prettier/prettier
  140:55  error  Delete `␍`                                                                        prettier/prettier
  141:6   error  Delete `␍`                                                                        prettier/prettier
  142:1   error  Delete `····␍`                                                                    prettier/prettier
  143:42  error  Delete `␍`                                                                        prettier/prettier
  144:42  error  Delete `␍`                                                                        prettier/prettier
  145:34  error  Delete `␍`                                                                        prettier/prettier
  146:7   error  Delete `␍`                                                                        prettier/prettier
  147:4   error  Delete `␍`                                                                        prettier/prettier
  148:1   error  Delete `␍`                                                                        prettier/prettier
  149:6   error  Delete `␍`                                                                        prettier/prettier
  150:18  error  Delete `␍`                                                                        prettier/prettier
  151:6   error  Delete `␍`                                                                        prettier/prettier
  152:21  error  Array type using 'T[]' is forbidden for non-simple types. Use 'Array<T>' instead  @typescript-eslint/array-type
  152:62  error  Delete `␍`                                                                        prettier/prettier
  153:14  error  Delete `␍`                                                                        prettier/prettier
  154:45  error  Delete `␍`                                                                        prettier/prettier
  155:71  error  Delete `␍`                                                                        prettier/prettier
  156:6   error  Delete `␍`                                                                        prettier/prettier
  157:1   error  Delete `····␍`                                                                    prettier/prettier
  158:42  error  Delete `␍`                                                                        prettier/prettier
  159:57  error  Delete `␍`                                                                        prettier/prettier
  160:34  error  Delete `␍`                                                                        prettier/prettier
  161:7   error  Delete `␍`                                                                        prettier/prettier
  162:4   error  Delete `␍`                                                                        prettier/prettier
  163:1   error  Delete `␍`                                                                        prettier/prettier
  164:6   error  Delete `␍`                                                                        prettier/prettier
  165:20  error  Delete `␍`                                                                        prettier/prettier
  166:6   error  Delete `␍`                                                                        prettier/prettier
  167:38  error  Delete `␍`                                                                        prettier/prettier
  168:53  error  Delete `␍`                                                                        prettier/prettier
  169:24  error  Delete `␍`                                                                        prettier/prettier
  170:4   error  Delete `␍`                                                                        prettier/prettier
  171:1   error  Delete `␍`                                                                        prettier/prettier
  172:6   error  Delete `␍`                                                                        prettier/prettier
  173:14  error  Delete `␍`                                                                        prettier/prettier
  174:6   error  Delete `␍`                                                                        prettier/prettier
  175:35  error  Delete `␍`                                                                        prettier/prettier
  176:37  error  Delete `␍`                                                                        prettier/prettier
  177:4   error  Delete `␍`                                                                        prettier/prettier
  178:1   error  Delete `␍`                                                                        prettier/prettier
  179:6   error  Delete `␍`                                                                        prettier/prettier
  180:18  error  Delete `␍`                                                                        prettier/prettier
  181:6   error  Delete `␍`                                                                        prettier/prettier
  182:27  error  Delete `␍`                                                                        prettier/prettier
  183:46  error  Delete `␍`                                                                        prettier/prettier
  184:4   error  Delete `␍`                                                                        prettier/prettier
  185:1   error  Delete `␍`                                                                        prettier/prettier
  186:22  error  Delete `␍`                                                                        prettier/prettier
  187:1   error  Delete `␍`                                                                        prettier/prettier
  188:6   error  Delete `␍`                                                                        prettier/prettier
  189:26  error  Delete `␍`                                                                        prettier/prettier
  190:6   error  Delete `␍`                                                                        prettier/prettier
  191:58  error  Delete `␍`                                                                        prettier/prettier
  192:40  error  Delete `␍`                                                                        prettier/prettier
  193:26  error  Delete `␍`                                                                        prettier/prettier
  194:1   error  Delete `␍`                                                                        prettier/prettier
  195:10  error  Delete `␍`                                                                        prettier/prettier
  196:52  error  Delete `␍`                                                                        prettier/prettier
  197:63  error  Delete `␍`                                                                        prettier/prettier
  198:22  error  Delete `␍`                                                                        prettier/prettier
  199:54  error  Delete `␍`                                                                        prettier/prettier
  200:17  error  Delete `␍`                                                                        prettier/prettier
  201:6   error  Delete `␍`                                                                        prettier/prettier
  202:4   error  Delete `␍`                                                                        prettier/prettier
  203:1   error  Delete `␍`                                                                        prettier/prettier
  204:6   error  Delete `␍`                                                                        prettier/prettier
  205:24  error  Delete `␍`                                                                        prettier/prettier
  206:6   error  Delete `␍`                                                                        prettier/prettier
  207:56  error  Delete `␍`                                                                        prettier/prettier
  208:40  error  Delete `␍`                                                                        prettier/prettier
  209:28  error  Delete `␍`                                                                        prettier/prettier
  210:1   error  Delete `␍`                                                                        prettier/prettier
  211:10  error  Delete `␍`                                                                        prettier/prettier
  212:52  error  Delete `␍`                                                                        prettier/prettier
  213:56  error  Delete `␍`                                                                        prettier/prettier
  214:22  error  Delete `␍`                                                                        prettier/prettier
  215:54  error  Delete `␍`                                                                        prettier/prettier
  216:19  error  Delete `␍`                                                                        prettier/prettier
  217:6   error  Delete `␍`                                                                        prettier/prettier
  218:4   error  Delete `␍`                                                                        prettier/prettier
  219:1   error  Delete `␍`                                                                        prettier/prettier
  220:6   error  Delete `␍`                                                                        prettier/prettier
  221:30  error  Delete `␍`                                                                        prettier/prettier
  222:6   error  Delete `␍`                                                                        prettier/prettier
  223:46  error  Delete `␍`                                                                        prettier/prettier
  224:34  error  Delete `␍`                                                                        prettier/prettier
  225:30  error  Delete `␍`                                                                        prettier/prettier
  226:6   error  Delete `␍`                                                                        prettier/prettier
  227:1   error  Delete `␍`                                                                        prettier/prettier
  228:10  error  Delete `␍`                                                                        prettier/prettier
  229:41  error  Delete `␍`                                                                        prettier/prettier
  230:51  error  Delete `␍`                                                                        prettier/prettier
  231:43  error  Delete `␍`                                                                        prettier/prettier
  232:22  error  Delete `␍`                                                                        prettier/prettier
  233:54  error  Delete `␍`                                                                        prettier/prettier
  234:19  error  Delete `␍`                                                                        prettier/prettier
  235:6   error  Delete `␍`                                                                        prettier/prettier
  236:4   error  Delete `␍`                                                                        prettier/prettier
  237:2   error  Delete `␍⏎␍`                                                                      prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\core\services\token-refresh.service.ts
    1:52  error  Delete `␍`                                                               prettier/prettier
    2:43  error  Delete `␍`                                                               prettier/prettier
    3:48  error  Delete `␍`                                                               prettier/prettier
    4:57  error  'EMPTY' is defined but never used. Allowed unused vars must match /^_/u  @typescript-eslint/no-unused-vars
    4:77  error  Delete `␍`                                                               prettier/prettier
    5:1   error  There should be at least one empty line between import groups            import/order
    5:54  error  'tap' is defined but never used. Allowed unused vars must match /^_/u    @typescript-eslint/no-unused-vars
    5:82  error  Delete `␍`                                                               prettier/prettier
    6:90  error  Delete `␍`                                                               prettier/prettier
    7:1   error  Delete `␍`                                                               prettier/prettier
    8:18  error  Delete `␍`                                                               prettier/prettier
    9:27  error  Delete `␍`                                                               prettier/prettier
   10:62  error  Delete `␍`                                                               prettier/prettier
   11:1   error  Delete `␍`                                                               prettier/prettier
   12:4   error  Delete `␍`                                                               prettier/prettier
   13:14  error  Delete `␍`                                                               prettier/prettier
   14:25  error  Delete `␍`                                                               prettier/prettier
   15:4   error  Delete `␍`                                                               prettier/prettier
   16:36  error  Delete `␍`                                                               prettier/prettier
   17:35  error  Delete `␍`                                                               prettier/prettier
   18:31  error  Delete `␍`                                                               prettier/prettier
   19:51  error  Delete `␍`                                                               prettier/prettier
   20:1   error  Delete `␍`                                                               prettier/prettier
   21:6   error  Delete `␍`                                                               prettier/prettier
   22:1   error  Expected 1 lines after block description                                 jsdoc/tag-lines
   22:23  error  Delete `␍`                                                               prettier/prettier
   23:25  error  Delete `␍`                                                               prettier/prettier
   24:6   error  Delete `␍`                                                               prettier/prettier
   25:63  error  Delete `␍`                                                               prettier/prettier
   26:40  error  Delete `␍`                                                               prettier/prettier
   27:26  error  Delete `␍`                                                               prettier/prettier
   28:21  error  Delete `␍`                                                               prettier/prettier
   29:24  error  Delete `␍`                                                               prettier/prettier
   30:21  error  Delete `␍`                                                               prettier/prettier
   31:17  error  Delete `␍`                                                               prettier/prettier
   32:7   error  Delete `␍`                                                               prettier/prettier
   33:1   error  Delete `␍`                                                               prettier/prettier
   34:14  error  Delete `␍`                                                               prettier/prettier
   35:25  error  Delete `␍`                                                               prettier/prettier
   36:50  error  Delete `␍`                                                               prettier/prettier
   37:33  error  Delete `␍`                                                               prettier/prettier
   38:26  error  Delete `␍`                                                               prettier/prettier
   39:16  error  Delete `␍`                                                               prettier/prettier
   40:31  error  Delete `␍`                                                               prettier/prettier
   41:6   error  Delete `␍`                                                               prettier/prettier
   42:1   error  Delete `␍`                                                               prettier/prettier
   43:40  error  Delete `␍`                                                               prettier/prettier
   44:17  error  Delete `␍`                                                               prettier/prettier
   45:38  error  Delete `␍`                                                               prettier/prettier
   46:26  error  Delete `␍`                                                               prettier/prettier
   47:63  error  Delete `␍`                                                               prettier/prettier
   48:8   error  Delete `␍`                                                               prettier/prettier
   49:38  error  Delete `␍`                                                               prettier/prettier
   50:6   error  Delete `␍`                                                               prettier/prettier
   51:1   error  Delete `␍`                                                               prettier/prettier
   52:50  error  Delete `␍`                                                               prettier/prettier
   53:26  error  Delete `␍`                                                               prettier/prettier
   54:30  error  Delete `␍`                                                               prettier/prettier
   55:1   error  Delete `␍`                                                               prettier/prettier
   56:58  error  Delete `␍`                                                               prettier/prettier
   57:66  error  Delete `␍`                                                               prettier/prettier
   58:23  error  Replace `(newToken)·=>·{␍` with `newToken·=>·{`                          prettier/prettier
   59:41  error  Delete `␍`                                                               prettier/prettier
   60:54  error  Delete `␍`                                                               prettier/prettier
   61:1   error  Delete `␍`                                                               prettier/prettier
   62:23  error  Delete `␍`                                                               prettier/prettier
   63:49  error  Delete `␍`                                                               prettier/prettier
   64:27  error  Delete `␍`                                                               prettier/prettier
   65:62  error  Delete `␍`                                                               prettier/prettier
   66:25  error  Delete `␍`                                                               prettier/prettier
   67:42  error  Delete `␍`                                                               prettier/prettier
   68:46  error  Delete `␍`                                                               prettier/prettier
   69:47  error  Delete `␍`                                                               prettier/prettier
   70:47  error  Delete `␍`                                                               prettier/prettier
   71:41  error  Delete `␍`                                                               prettier/prettier
   72:49  error  Delete `␍`                                                               prettier/prettier
   73:62  error  Delete `␍`                                                               prettier/prettier
   74:27  error  Delete `␍`                                                               prettier/prettier
   75:11  error  Delete `␍`                                                               prettier/prettier
   76:1   error  Delete `␍`                                                               prettier/prettier
   77:26  error  Delete `␍`                                                               prettier/prettier
   78:43  error  Delete `␍`                                                               prettier/prettier
   79:1   error  Delete `␍`                                                               prettier/prettier
   80:20  error  Delete `␍`                                                               prettier/prettier
   81:31  error  Delete `␍`                                                               prettier/prettier
   82:38  error  Delete `␍`                                                               prettier/prettier
   83:1   error  Delete `␍`                                                               prettier/prettier
   84:51  error  Delete `␍`                                                               prettier/prettier
   85:25  error  Delete `␍`                                                               prettier/prettier
   86:10  error  Delete `␍`                                                               prettier/prettier
   87:28  error  Delete `␍`                                                               prettier/prettier
   88:31  error  Delete `␍`                                                               prettier/prettier
   89:34  error  Delete `␍`                                                               prettier/prettier
   90:1   error  Delete `········␍`                                                       prettier/prettier
   91:28  error  Delete `␍`                                                               prettier/prettier
   92:63  error  Delete `␍`                                                               prettier/prettier
   93:10  error  Delete `␍`                                                               prettier/prettier
   94:1   error  Delete `········␍`                                                       prettier/prettier
   95:40  error  Delete `␍`                                                               prettier/prettier
   96:9   error  Delete `␍`                                                               prettier/prettier
   97:7   error  Delete `␍`                                                               prettier/prettier
   98:4   error  Delete `␍`                                                               prettier/prettier
   99:1   error  Delete `␍`                                                               prettier/prettier
  100:6   error  Delete `␍`                                                               prettier/prettier
  101:14  error  Delete `␍`                                                               prettier/prettier
  102:6   error  Delete `␍`                                                               prettier/prettier
  103:29  error  Delete `␍`                                                               prettier/prettier
  104:65  error  Delete `␍`                                                               prettier/prettier
  105:1   error  Delete `····␍`                                                           prettier/prettier
  106:36  error  Delete `␍`                                                               prettier/prettier
  107:19  error  Delete `␍`                                                               prettier/prettier
  108:6   error  Delete `␍`                                                               prettier/prettier
  109:1   error  Delete `␍`                                                               prettier/prettier
  110:18  error  Delete `␍`                                                               prettier/prettier
  111:50  error  Delete `␍`                                                               prettier/prettier
  112:45  error  Delete `␍`                                                               prettier/prettier
  113:1   error  Delete `␍`                                                               prettier/prettier
  114:35  error  Delete `␍`                                                               prettier/prettier
  115:4   error  Delete `␍`                                                               prettier/prettier
  116:1   error  Delete `␍`                                                               prettier/prettier
  117:6   error  Delete `␍`                                                               prettier/prettier
  118:15  error  Delete `␍`                                                               prettier/prettier
  119:6   error  Delete `␍`                                                               prettier/prettier
  120:28  error  Delete `␍`                                                               prettier/prettier
  121:26  error  Delete `␍`                                                               prettier/prettier
  122:4   error  Delete `␍`                                                               prettier/prettier
  123:1   error  Delete `␍`                                                               prettier/prettier
  124:6   error  Delete `␍`                                                               prettier/prettier
  125:12  error  Delete `␍`                                                               prettier/prettier
  126:6   error  Delete `␍`                                                               prettier/prettier
  127:41  error  Delete `␍`                                                               prettier/prettier
  128:31  error  Delete `␍`                                                               prettier/prettier
  129:24  error  Delete `␍`                                                               prettier/prettier
  130:14  error  Delete `␍`                                                               prettier/prettier
  131:29  error  Delete `␍`                                                               prettier/prettier
  132:4   error  Delete `␍`                                                               prettier/prettier
  133:1   error  Delete `␍`                                                               prettier/prettier
  134:6   error  Delete `␍`                                                               prettier/prettier
  135:20  error  Delete `␍`                                                               prettier/prettier
  136:6   error  Delete `␍`                                                               prettier/prettier
  137:30  error  Delete `␍`                                                               prettier/prettier
  138:27  error  Delete `␍`                                                               prettier/prettier
  139:30  error  Delete `␍`                                                               prettier/prettier
  140:44  error  Delete `␍`                                                               prettier/prettier
  141:4   error  Delete `␍`                                                               prettier/prettier
  142:2   error  Delete `␍⏎␍`                                                             prettier/prettier

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

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\components\organization-form\organization-form.component.ts
  64:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\models\common.model.ts
   27:28  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  121:12  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  152:10  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\organization\services\organization.service.ts
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

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\models\project-activity.model.ts
  31:29  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\features\projects\services\project.service.ts
  120:26  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\layout\passport-layout\passport.component.ts
  57:25  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\shared\directives\auth.directive.ts
  30:44  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\shared\directives\has-permission.directive.ts
    1:108  error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
    2:37   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
    3:1    error    `@core/services/rbac.service` import should occur before import of `rxjs`                                                                                                                                                                                                                                         import/order
    3:71   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
    4:1    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
    5:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
    6:8    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
    7:19   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
    8:3    error    Delete `·␍`                                                                                                                                                                                                                                                                                                       prettier/prettier
    9:12   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   10:11   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   11:17   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   12:52   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   13:11   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   14:13   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   15:3    error    Delete `·␍`                                                                                                                                                                                                                                                                                                       prettier/prettier
   16:17   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   17:43   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   18:11   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   19:13   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   20:3    error    Delete `·␍`                                                                                                                                                                                                                                                                                                       prettier/prettier
   21:17   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   22:87   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   23:11   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   24:10   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   25:3    error    Delete `·␍`                                                                                                                                                                                                                                                                                                       prettier/prettier
   26:17   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   27:83   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   28:20   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   29:10   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   30:7    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   31:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   32:13   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   33:31   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   34:19   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   35:3    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   36:67   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   37:45   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   38:44   warning  Unexpected any. Specify a different type                                                                                                                                                                                                                                                                          @typescript-eslint/no-explicit-any
   38:50   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   39:52   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   40:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
   41:49   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   42:31   error    Array type using 'T[]' is forbidden for non-simple types. Use 'Array<T>' instead                                                                                                                                                                                                                                  @typescript-eslint/array-type
   42:60   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   43:44   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   44:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
   45:64   error    Array type using 'T[]' is forbidden for non-simple types. Use 'Array<T>' instead                                                                                                                                                                                                                                  @typescript-eslint/array-type
   45:90   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   46:37   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   47:44   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   48:13   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   49:46   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   50:6    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   51:23   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   52:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   53:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
   54:56   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   55:27   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   56:23   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   57:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   58:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
   59:21   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   60:23   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   61:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   62:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
   63:24   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   64:48   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   65:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   66:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
   67:31   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   68:15   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   69:48   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   70:1    error    Delete `····␍`                                                                                                                                                                                                                                                                                                    prettier/prettier
   71:18   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   72:28   error    Replace `·this.checkMode·===·'any'␍` with `⏎······this.checkMode·===·'any'`                                                                                                                                                                                                                                       prettier/prettier
   73:1    error    Replace `······?·this.rbacService.hasAnyPermission(this.permissionsToCheck)␍` with `········?·this.rbacService.hasAnyPermission(this.permissionsToCheck)`                                                                                                                                                         prettier/prettier
   74:1    error    Replace `······:·this.rbacService.hasAllPermissions(this.permissionsToCheck);␍` with `········:·this.rbacService.hasAllPermissions(this.permissionsToCheck);`                                                                                                                                                     prettier/prettier
   75:1    error    Delete `····␍`                                                                                                                                                                                                                                                                                                    prettier/prettier
   76:16   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   77:79   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   78:34   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   79:27   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   80:65   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   81:8    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   82:8    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   83:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   84:2    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   85:1    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   86:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   87:8    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   88:19   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   89:3    error    Delete `·␍`                                                                                                                                                                                                                                                                                                       prettier/prettier
   90:12   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   91:11   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   92:17   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   93:34   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   94:10   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   95:13   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   96:3    error    Delete `·␍`                                                                                                                                                                                                                                                                                                       prettier/prettier
   97:17   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   98:33   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
   99:10   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  100:13   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  101:3    error    Delete `·␍`                                                                                                                                                                                                                                                                                                       prettier/prettier
  102:17   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  103:60   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  104:10   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  105:10   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  106:7    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  107:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  108:13   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  109:25   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  110:19   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  111:3    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  112:61   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  113:45   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  114:44   warning  Unexpected any. Specify a different type                                                                                                                                                                                                                                                                          @typescript-eslint/no-explicit-any
  114:50   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  115:52   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  116:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
  117:43   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  118:39   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  119:44   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  120:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
  121:50   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  122:31   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  123:32   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  124:13   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  125:34   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  126:6    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  127:23   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  128:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  129:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
  130:50   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  131:27   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  132:23   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  133:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  134:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
  135:21   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  136:23   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  137:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  138:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
  139:24   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  140:42   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  141:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  142:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
  143:31   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  144:15   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  145:42   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  146:1    error    Delete `····␍`                                                                                                                                                                                                                                                                                                    prettier/prettier
  147:18   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  148:28   error    Replace `·this.checkMode·===·'any'␍⏎······?·this.rbacService.hasAnyRole(this.rolesToCheck)␍⏎······:·this.rbacService.hasRole(this.rolesToCheck[0]);··//·單一角色␍` with `⏎······this.checkMode·===·'any'·?·this.rbacService.hasAnyRole(this.rolesToCheck)·:·this.rbacService.hasRole(this.rolesToCheck[0]);·//·單一角色`  prettier/prettier
  151:1    error    Delete `····␍`                                                                                                                                                                                                                                                                                                    prettier/prettier
  152:16   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  153:67   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  154:34   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  155:21   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  156:65   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  157:8    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  158:8    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  159:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  160:2    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  161:1    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  162:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  163:15   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  164:23   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  165:3    error    Delete `·␍`                                                                                                                                                                                                                                                                                                       prettier/prettier
  166:12   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  167:11   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  168:46   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  169:21   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  170:10   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  171:7    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  172:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  173:13   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  174:34   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  175:19   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  176:3    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  177:70   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  178:45   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  179:44   warning  Unexpected any. Specify a different type                                                                                                                                                                                                                                                                          @typescript-eslint/no-explicit-any
  179:50   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  180:52   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  181:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
  182:49   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  183:48   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  184:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
  185:67   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  186:34   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  187:23   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  188:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  189:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
  190:21   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  191:23   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  192:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  193:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
  194:24   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  195:48   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  196:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  197:1    error    Delete `··␍`                                                                                                                                                                                                                                                                                                      prettier/prettier
  198:31   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  199:48   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  200:1    error    Delete `····␍`                                                                                                                                                                                                                                                                                                    prettier/prettier
  201:111  error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  202:34   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  203:23   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  204:28   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  205:65   error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  206:8    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  207:8    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  208:4    error    Delete `␍`                                                                                                                                                                                                                                                                                                        prettier/prettier
  209:2    error    Delete `␍⏎␍`                                                                                                                                                                                                                                                                                                      prettier/prettier

C:\Users\user\Downloads\ng-alain-build\src\app\shared\directives\screen-less-hidden.directive.ts
  30:44  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\shared\shared-zorro.module.ts
  38:3  warning  `NzToolTipModule` is deprecated. Use {@link NzTooltipModule} instead.
This will be removed in v21.0.0  @typescript-eslint/no-deprecated

C:\Users\user\Downloads\ng-alain-build\src\app\system\extras\poi\edit\edit.component.ts
  17:6  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\app\system\extras\settings\settings.component.ts
  32:22  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

C:\Users\user\Downloads\ng-alain-build\src\environments\environment.ts
  15:34  error  Delete `·`                prettier/prettier
  19:25  error  Delete `·········`        prettier/prettier
  20:28  error  Delete `·······`          prettier/prettier
  21:20  error  Delete `···············`  prettier/prettier
  22:21  error  Delete `·············`    prettier/prettier

✖ 2700 problems (2584 errors, 116 warnings)
  2569 errors and 0 warnings potentially fixable with the `--fix` option.
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

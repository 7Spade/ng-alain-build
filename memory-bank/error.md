  yarn run lint
  shell: /usr/bin/bash -e {0}

> ng-alain@20.0.2 lint:ts
> npx eslint --cache --fix


/home/runner/work/ng-alain-build/ng-alain-build/_mock/_api.ts
Warning:    35:35  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    36:15  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    80:23  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   145:27  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/ng-alain-build/ng-alain-build/_mock/_chart.ts
Warning:     6:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    17:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    26:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:    33:19  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   120:20  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   127:25  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   164:18  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   165:22  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   172:32  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/ng-alain-build/ng-alain-build/_mock/_project.ts
Error:   216:34  error  'req' is defined but never used  @typescript-eslint/no-unused-vars

/home/runner/work/ng-alain-build/ng-alain-build/_mock/_rule.ts
Warning:    3:13  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   26:26  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   26:32  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/ng-alain-build/ng-alain-build/_mock/_user.ts
Warning:    3:13  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   27:26  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   27:55  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   40:38  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/ng-alain-build/ng-alain-build/e2e/src/app.po.ts
Warning:   4:25  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
Warning:   5:52  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/ng-alain-build/ng-alain-build/scripts/generate-tree.ts
Error:   96:12  error  'error' is defined but never used  @typescript-eslint/no-unused-vars

/home/runner/work/ng-alain-build/ng-alain-build/src/app/app.config.ts
Error:    25:1   error    There should be at least one empty line between import groups                                                                                                                                                                                                                                                                                                                                                                                                                                                      import/order
Error:    27:1   error    `@angular/fire/messaging` import should occur before import of `@delon/abc/cell`                                                                                                                                                                                                                                                                                                                                                                                                                                   import/order
Error:    18:40  error  'NzUploadChangeParam' is defined but never used    @typescript-eslint/no-unused-vars
Error:   172:14  error  'err' is defined but never used                    @typescript-eslint/no-unused-vars

/home/runner/work/ng-alain-build/ng-alain-build/src/app/features/projects/components/project-form/project-form.component.ts
Error:   3:1  error  There should be no empty line within import group  import/order

/home/runner/work/ng-alain-build/ng-alain-build/src/app/features/projects/components/project-list/project-list.component.ts
Error:   4:1   error  There should be no empty line within import group  import/order
Error:   7:10  error  'PageHeaderComponent' is defined but never used    @typescript-eslint/no-unused-vars
Error:   7:37  error  '@shared' imported multiple times                  import/no-duplicates
Error:   8:31  error  '@shared' imported multiple times                  import/no-duplicates

/home/runner/work/ng-alain-build/ng-alain-build/src/app/features/projects/components/project-overview/project-overview.component.ts
Error:   3:1  error  There should be no empty line within import group  import/order

/home/runner/work/ng-alain-build/ng-alain-build/src/app/features/projects/components/project-settings/project-settings.component.ts
Error:   4:1  error  There should be no empty line within import group  import/order

/home/runner/work/ng-alain-build/ng-alain-build/src/app/features/projects/models/project-activity.model.ts
Warning:   31:29  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/ng-alain-build/ng-alain-build/src/app/features/projects/services/project-file.service.ts
Error:    7:33  error  'HttpEventType' is defined but never used  @typescript-eslint/no-unused-vars
Error:   10:10  error  'map' is defined but never used            @typescript-eslint/no-unused-vars

/home/runner/work/ng-alain-build/ng-alain-build/src/app/features/projects/services/project.service.ts
Warning:   120:26  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/ng-alain-build/ng-alain-build/src/app/layout/basic-layout/widgets/org-switcher.component.ts
Error:   24:3  error  'ORGANIZATION_ROLE_LABELS' is defined but never used  @typescript-eslint/no-unused-vars
Error:   25:3  error  'ORGANIZATION_ROLE_COLORS' is defined but never used  @typescript-eslint/no-unused-vars

/home/runner/work/ng-alain-build/ng-alain-build/src/app/layout/passport-layout/passport.component.ts
Warning:   57:25  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/ng-alain-build/ng-alain-build/src/app/shared/directives/auth.directive.ts
Warning:   30:44  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/ng-alain-build/ng-alain-build/src/app/shared/directives/screen-less-hidden.directive.ts
Warning:   30:44  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/ng-alain-build/ng-alain-build/src/app/shared/pipes/map.pipe.ts
Error:   121:9  error  Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment

/home/runner/work/ng-alain-build/ng-alain-build/src/app/shared/shared-zorro.module.ts
  38:3  warning  `NzToolTipModule` is deprecated. Use {@link NzTooltipModule} instead.
This will be removed in v21.0.0  @typescript-eslint/no-deprecated

/home/runner/work/ng-alain-build/ng-alain-build/src/app/shared/utils/tree-table-tools.ts
Error:   84:11  error  Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions

/home/runner/work/ng-alain-build/ng-alain-build/src/app/system/extras/poi/edit/edit.component.ts
Warning:   17:6  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/runner/work/ng-alain-build/ng-alain-build/src/app/system/extras/settings/settings.component.ts
Warning:   32:22  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

✖ 163 problems (65 errors, 98 warnings)
  10 errors and 0 warnings potentially fixable with the `--fix` option.

Error: Process completed with exit code 1.

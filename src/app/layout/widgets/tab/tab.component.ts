import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { TabModel, TabService } from '@core';
import { MouseHoverShowDirective, fnStopMouseEvent } from '@shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzContextMenuService, NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { filter } from 'rxjs/operators';

/**
 * Tab 組件
 *
 * @description 多頁簽管理 UI 組件
 */
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzCardModule, NzTabsModule, NzDropDownModule, NzMenuModule, NzButtonModule, MouseHoverShowDirective, NzIconModule, AsyncPipe]
})
export class TabComponent implements OnInit {
  private tabService = inject(TabService);
  private nzContextMenuService = inject(NzContextMenuService);
  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);

  tabsSourceData: TabModel[] = [];
  tabsSourceData$ = this.tabService.getTabArray$();

  constructor() {
    // 監聽路由變化，更新視圖
    this.router.events
      .pipe(
        filter((event: NzSafeAny) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  /**
   * 獲取當前 Tab 索引
   */
  get currentIndex(): number {
    return this.tabService.getCurrentTabIndex();
  }

  /**
   * Track by 函數
   */
  public trackByTab(index: number, tab: TabModel): string {
    return tab.path;
  }

  /**
   * 點擊 Tab 跳轉到對應的 path
   */
  goPage(tab: TabModel): void {
    this.router.navigateByUrl(tab.path);
  }

  /**
   * 右鍵點擊關閉右側 Tab
   */
  closeRightTab(tab: TabModel, e: MouseEvent, index: number): void {
    fnStopMouseEvent(e);
    this.tabService.delRightTab(tab.path, index);
  }

  /**
   * 右鍵點擊關閉左側 Tab
   */
  closeLeftTab(tab: TabModel, e: MouseEvent, index: number): void {
    if (index === 0) {
      return;
    }
    fnStopMouseEvent(e);
    this.tabService.delLeftTab(tab.path, index);
  }

  /**
   * 關閉其他 Tab
   */
  closeOtherTab(tab: TabModel, e: MouseEvent, index: number): void {
    fnStopMouseEvent(e);
    this.tabService.delOtherTab(tab.path, index);
  }

  /**
   * 右鍵關閉當前 Tab
   */
  closeTab(tab: TabModel, e: MouseEvent, index: number): void {
    fnStopMouseEvent(e);
    this.closeCurrentTab(tab, index);
  }

  /**
   * 點擊 Tab 上的關閉 icon
   */
  clickCloseIcon(indexObj: { index: number }): void {
    this.closeCurrentTab(this.tabsSourceData[indexObj.index], indexObj.index);
  }

  /**
   * 關閉當前 Tab
   */
  closeCurrentTab(tab: TabModel, index: number): void {
    if (this.tabsSourceData.length === 1) {
      return;
    }
    this.tabService.delTab(tab, index);
    this.cdr.detectChanges();
  }

  /**
   * 刷新當前 Tab
   */
  refresh(): void {
    this.tabService.refresh();
  }

  /**
   * 右鍵功能表
   */
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  /**
   * 關閉功能表
   */
  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  ngOnInit(): void {
    this.tabsSourceData$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.tabsSourceData = res;
      this.cdr.markForCheck();
    });
  }
}

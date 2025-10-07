import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router, UrlSegment } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { uniqBy } from 'lodash';

import { getDeepReuseStrategyKeyFn, fnGetPathWithoutParam } from '@shared';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { SimpleReuseStrategy } from './simple-reuse-strategy';

/**
 * Tab 模型
 */
export interface TabModel {
  /** Tab 標題 */
  title: string;
  /** Tab 路徑 */
  path: string;
  /** 路由快照數組（用於緩存管理） */
  snapshotArray: ActivatedRouteSnapshot[];
}

/**
 * Tab 管理服務
 * @description 管理多頁簽的添加、刪除、刷新等操作
 */
@Injectable({
  providedIn: 'root'
})
export class TabService {
  private tabArray$ = new BehaviorSubject<TabModel[]>([]);
  private tabArray: TabModel[] = [];
  private currSelectedIndexTab = 0;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  /**
   * 獲取 Tab 數組的 Observable
   */
  getTabArray$(): Observable<TabModel[]> {
    return this.tabArray$.asObservable();
  }

  /**
   * 設置 Tab 數組
   */
  setTabArray$(tabArray: TabModel[]): void {
    this.tabArray$.next(tabArray);
  }

  /**
   * 更新 Tab 源數據
   */
  setTabsSourceData(): void {
    this.setTabArray$(this.tabArray);
  }

  /**
   * 清空所有 Tab
   */
  clearTabs(): void {
    this.tabArray = [];
    this.setTabsSourceData();
  }

  /**
   * 添加 Tab
   * @param tabModel Tab 模型
   * @param isNewTabDetailPage 是否是新 Tab 詳情頁
   */
  addTab(tabModel: TabModel, isNewTabDetailPage = false): void {
    this.tabArray.forEach(tab => {
      // 列表詳情操作，在當前 tab 中打開詳情
      if (tab.title === tabModel.title && !isNewTabDetailPage) {
        // 將每個 tab 下的組件快照存入 tab 數組中，去重操作
        tab.snapshotArray = uniqBy([...tab.snapshotArray, ...tabModel.snapshotArray], (item: NzSafeAny) => {
          return item['_routerState'].url;
        });
        // 當前頁中打開詳情時，需要將對應的 tab 的 path 替換掉
        tab.path = tabModel.path;
      }
    });
    
    // 如果 Tab 不存在則添加
    if (!this.tabArray.find(value => value.path === tabModel.path)) {
      this.tabArray.push(tabModel);
    }
    this.setTabsSourceData();
  }

  /**
   * 獲取 Tab 數組
   */
  getTabArray(): TabModel[] {
    return this.tabArray;
  }

  /**
   * 修改當前 Tab 標題
   */
  changeTabTitle(title: string): void {
    this.tabArray[this.getCurrentTabIndex()].title = title;
    this.setTabArray$(this.tabArray);
  }

  /**
   * 通過 key 來刪除路由復用中的緩存
   */
  delReuseStrategy(snapshotArray: ActivatedRouteSnapshot[]): void {
    const beDeleteKeysArray = this.getSnapshotArrayKey(snapshotArray);
    beDeleteKeysArray.forEach(item => {
      SimpleReuseStrategy.deleteRouteSnapshot(item);
    });
  }

  /**
   * 根據 tab 中緩存的路由快照，構造路由復用的 key
   */
  getSnapshotArrayKey(activatedArray: ActivatedRouteSnapshot[]): string[] {
    const temp: string[] = [];
    activatedArray.forEach(item => {
      const key = getDeepReuseStrategyKeyFn(item);
      temp.push(key);
    });
    return temp;
  }

  /**
   * 右鍵 Tab 移除右邊所有 Tab
   * @param tabPath Tab 路徑
   * @param index Tab 索引
   */
  delRightTab(tabPath: string, index: number): void {
    // 獲取待刪除的 tab
    const beDelTabArray = this.tabArray.filter((item, tabindex) => {
      return tabindex > index;
    });
    
    // 移除右鍵選中的 tab 右邊的所有 tab
    this.tabArray.length = index + 1;
    beDelTabArray.forEach(({ snapshotArray }) => {
      this.delReuseStrategy(snapshotArray);
    });
    
    // 如果滑鼠右鍵選中的 tab 索引小於當前展示的 tab 的索引，要連同正在打開的 tab 也要被刪除
    if (index < this.currSelectedIndexTab) {
      SimpleReuseStrategy.waitDelete = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
      this.router.navigateByUrl(this.tabArray[index].path);
    }
    this.setTabsSourceData();
  }

  /**
   * 右鍵移除左邊所有 Tab
   * @param tabPath Tab 路徑
   * @param index 當前滑鼠點擊右鍵所在的 tab 索引
   */
  delLeftTab(tabPath: string, index: number): void {
    if (index === 0) {
      return;
    }
    
    // 要刪除的 tab
    const beDelTabArray = this.tabArray.filter((item, tabindex) => {
      return tabindex < index;
    });

    // 處理索引關係
    if (this.currSelectedIndexTab === index) {
      this.currSelectedIndexTab = 0;
    } else if (this.currSelectedIndexTab < index) {
      // 如果滑鼠點擊的 tab 索引大於當前索引，需要將當前頁的 path 放到 waitDelete 中
      SimpleReuseStrategy.waitDelete = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
      this.currSelectedIndexTab = 0;
    } else if (this.currSelectedIndexTab > index) {
      this.currSelectedIndexTab = this.currSelectedIndexTab - beDelTabArray.length;
    }
    
    // 剩餘的 tab
    this.tabArray = this.tabArray.splice(beDelTabArray.length);
    beDelTabArray.forEach(({ snapshotArray }) => {
      this.delReuseStrategy(snapshotArray);
    });
    this.setTabsSourceData();
    this.router.navigateByUrl(this.tabArray[this.currSelectedIndexTab].path);
  }

  /**
   * 右鍵 Tab 選擇「移除其他 Tab」
   */
  delOtherTab(path: string, index: number): void {
    // 要刪除的 tab
    const beDelTabArray = this.tabArray.filter((item, tabindex) => {
      return tabindex !== index;
    });

    // 處理應當展示的 tab
    this.tabArray = [this.tabArray[index]];
    // 移除要刪除的 tab 的緩存
    beDelTabArray.forEach(({ snapshotArray }) => {
      this.delReuseStrategy(snapshotArray);
    });

    // 如果滑鼠選中的 tab 的索引，不是當前打開的頁面的 tab 的索引，則要將當前頁面的 key 作為 waitDelete
    if (index !== this.currSelectedIndexTab) {
      SimpleReuseStrategy.waitDelete = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
    }
    this.router.navigateByUrl(path);
    this.setTabsSourceData();
  }

  /**
   * 刪除 Tab
   * @param tab Tab 模型
   * @param index Tab 索引
   */
  delTab(tab: TabModel, index: number): void {
    // 移除當前正在展示的 tab
    if (index === this.currSelectedIndexTab) {
      const seletedTabKey = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
      this.tabArray.splice(index, 1);
      // 處理索引關係
      this.currSelectedIndexTab = index - 1 < 0 ? 0 : index - 1;
      // 跳轉到新 tab
      this.router.navigateByUrl(this.tabArray[this.currSelectedIndexTab].path);
      // 在 reuse-strategy 中緩存當前的 path
      SimpleReuseStrategy.waitDelete = seletedTabKey;
    } else if (index < this.currSelectedIndexTab) {
      // 如果滑鼠選中的 tab 索引小於當前展示的 tab 索引
      this.tabArray.splice(index, 1);
      this.currSelectedIndexTab = this.currSelectedIndexTab - 1;
    } else if (index > this.currSelectedIndexTab) {
      // 移除當前頁簽右邊的頁簽
      this.tabArray.splice(index, 1);
    }
    
    // 刪除選中的 tab 所緩存的快照
    this.delReuseStrategy(tab.snapshotArray);
    this.setTabsSourceData();
  }

  /**
   * 查找 Tab 索引
   */
  findIndex(path: string): number {
    const current = this.tabArray.findIndex(tabItem => {
      return path === tabItem.path;
    });
    this.currSelectedIndexTab = current;
    return current;
  }

  /**
   * 獲取當前路徑（不含參數）
   */
  getCurrentPathWithoutParam(urlSegmentArray: UrlSegment[], queryParam: Record<string, NzSafeAny>): string {
    const temp: string[] = [];
    // 獲取所有參數的 value
    const queryParamValuesArray = Object.values(queryParam);
    urlSegmentArray.forEach(urlSegment => {
      // 把表示參數的 url 片段剔除
      if (!queryParamValuesArray.includes(urlSegment.path)) {
        temp.push(urlSegment.path);
      }
    });
    return `${temp.join('/')}`;
  }

  /**
   * 刷新當前 Tab
   */
  refresh(): void {
    // 獲取當前的路由快照
    let snapshot = this.activatedRoute.snapshot;
    const key = getDeepReuseStrategyKeyFn(snapshot);
    
    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
    }
    
    let params: Params;
    let urlWithOutParam = ''; // 這是沒有參數的 url
    
    // 是路徑傳參的路由，並且有參數
    if (Object.keys(snapshot.params).length > 0) {
      params = snapshot.params;
      const urlSegment = (snapshot as NzSafeAny)['_urlSegment'];
      urlWithOutParam = this.getCurrentPathWithoutParam(urlSegment.segments, params);
      this.router.navigateByUrl('/system/exception', { skipLocationChange: true }).then(() => {
        SimpleReuseStrategy.deleteRouteSnapshot(key);
        this.router.navigate([urlWithOutParam, ...Object.values(params)]);
      });
    } else {
      // 是 query 傳參的路由，或者是沒有參數的路由
      params = snapshot.queryParams;
      const sourceUrl = this.router.url;
      const currentRoute = fnGetPathWithoutParam(sourceUrl);
      // 是 query 傳參
      this.router.navigateByUrl('/system/exception', { skipLocationChange: true }).then(() => {
        SimpleReuseStrategy.deleteRouteSnapshot(key);
        this.router.navigate([currentRoute], { queryParams: params });
      });
    }
  }

  /**
   * 獲取當前 Tab 索引
   */
  getCurrentTabIndex(): number {
    return this.currSelectedIndexTab;
  }
}


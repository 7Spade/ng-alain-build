import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ModeType = 'user' | 'org' | 'demo';

@Injectable({ providedIn: 'root' })
export class ModeService {
  private static readonly STORAGE_KEY = 'app_mode';
  private readonly subject: BehaviorSubject<ModeType>;

  constructor() {
    const stored = (localStorage.getItem(ModeService.STORAGE_KEY) as ModeType) || 'user';
    this.subject = new BehaviorSubject<ModeType>(stored);
  }

  get mode$() {
    return this.subject.asObservable();
  }

  getCurrentMode(): ModeType {
    return this.subject.value;
  }

  setMode(mode: ModeType): void {
    if (this.subject.value === mode) return;
    this.subject.next(mode);
    localStorage.setItem(ModeService.STORAGE_KEY, mode);
  }
}



import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('light-theme');
  theme$ = this.themeSubject.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }

  setTheme(theme: string) {
    this.themeSubject.next(theme);
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const current = this.themeSubject.value;
    const newTheme = current === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }
}

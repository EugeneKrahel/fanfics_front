import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ThemeService {
  isDarkTheme: boolean;

  getTheme(isDark: boolean): void {
    this.isDarkTheme = isDark;
  }

  postTheme(): boolean {
    return this.isDarkTheme;
  }
}

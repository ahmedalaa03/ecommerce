import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private readonly renderer2 = inject(RendererFactory2).createRenderer(null, null)
  constructor(private translateService: TranslateService, @Inject(PLATFORM_ID) private id: object) {
    if (isPlatformBrowser(this.id)) {
      this.translateService.setDefaultLang('en');
      if (localStorage.getItem('lang')) {
        this.translateService.use(localStorage.getItem('lang')!);
      }
      this.changeDirection();
    }
  }
  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
    }
    else if (localStorage.getItem('lang') === 'ar') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }
  changeLangTranslate(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
    this.changeDirection();
  }
}

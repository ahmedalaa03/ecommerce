import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from "ngx-spinner";
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,withViewTransitions()),
  provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch(), withInterceptors([headersInterceptor, errorsInterceptor, loadingInterceptor])),
  provideAnimations(),
  provideToastr(),
  importProvidersFrom(NgxSpinnerModule, TranslateModule.forRoot({
    defaultLanguage: 'en',
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }))
  ]
};

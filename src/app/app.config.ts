import {
  ApplicationConfig,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { loginEffect, registerEffect } from './shared/store/auth-effect';
import { authFeatures } from './shared/store/auth-features';
import { environment } from '../environments/environment';

export const API_URL = new InjectionToken<string>('API_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ [authFeatures.name]: authFeatures.reducer }),
    provideEffects({ loginEffect, registerEffect }),
    {
      provide: API_URL,
      useValue: environment.apiUrl,
    },
  ],
};

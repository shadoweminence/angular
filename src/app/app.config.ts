// ============================================================================
// APP CONFIGURATION - Main application setup
// React equivalent: App.jsx with Provider wrappers and store configuration
// ============================================================================

import {
  ApplicationConfig,
  InjectionToken, // React equivalent: Context API or environment variables
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router'; // React: <BrowserRouter>
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store'; // React: <Provider store={store}>
import { provideEffects } from '@ngrx/effects'; // React: Redux middleware (thunk/saga)
import { provideHttpClient } from '@angular/common/http'; // React: axios/fetch (no provider needed)
import { loginEffect, registerEffect } from './shared/store/auth-effect';
import { authFeatures } from './shared/store/auth-features';
import { environment } from '../environments/environment';
import { provideNgToast } from 'ng-angular-popup';

// InjectionToken: Angular's way to provide values through Dependency Injection
// React equivalent: process.env.REACT_APP_API_URL or Context
export const API_URL = new InjectionToken<string>('API_URL');

// ApplicationConfig: Central configuration for the entire Angular app
// React equivalent: Wrapping App component with providers in index.js/App.js
export const appConfig: ApplicationConfig = {
  providers: [
    // Global error handling
    // React equivalent: Error Boundary component
    provideBrowserGlobalErrorListeners(),

    // Routing configuration
    // React equivalent: <BrowserRouter><Routes>...</Routes></BrowserRouter>
    provideRouter(routes),

    // HTTP client for API calls
    // React equivalent: Just import axios or use fetch (no setup needed)
    provideHttpClient(),

    // State management store with auth reducer
    // React equivalent: const store = configureStore({ reducer: { auth: authReducer } })
    // Then wrap app with <Provider store={store}>
    provideStore({ [authFeatures.name]: authFeatures.reducer }),

    // Side effects middleware for async operations (like API calls)
    // React equivalent: Redux Thunk (built-in) or Redux Saga middleware
    // In React: middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
    provideEffects({ loginEffect, registerEffect }),

    // Dependency Injection: Provide API_URL token with actual value
    // React equivalent: const API_URL = process.env.REACT_APP_API_URL
    // Or: <ApiUrlContext.Provider value="https://fakestoreapi.com">
    {
      provide: API_URL,
      useValue: environment.apiUrl,
    },
    provideNgToast({
      duration: 3000,
      position: 'toaster-top-right',
    }),
  ],
};

// ============================================================================
// APP CONFIGURATION - Main application setup
// React equivalent: App.jsx with Provider wrappers and store configuration
// ============================================================================

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router'; // React: <BrowserRouter>
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store'; // React: <Provider store={store}>
import { provideEffects } from '@ngrx/effects'; // React: Redux middleware (thunk/saga)
import { provideHttpClient } from '@angular/common/http'; // React: axios/fetch (no provider needed)
import {
  loginEffect,
  logoutEffect,
  registerEffect,
  restoreSessionEffect,
} from '@store/auth/auth-effect';
import { authFeatures } from '@store/auth/auth-features';
import { environment } from '@environments/environment';
import { provideNgToast } from 'ng-angular-popup';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { API_URL } from '@app/shared/tokens/api-token';
import { productFeatures } from '@store/product/productFeatures';
import { productEffect } from '@store/product/productEffect';

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
    provideStore({
      [authFeatures.name]: authFeatures.reducer,
      [productFeatures.name]: productFeatures.reducer,
    }),

    // Side effects middleware for async operations (like API calls)
    // React equivalent: Redux Thunk (built-in) or Redux Saga middleware
    // In React: middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
    provideEffects({
      loginEffect,
      registerEffect,
      restoreSessionEffect,
      logoutEffect,
      productEffect,
    }),

    // ========================================================================
    // DEPENDENCY INJECTION: Provide API_URL token with actual value
    // ========================================================================
    // This is Angular's Dependency Injection system in action
    //
    // React equivalent:
    //   const API_URL = process.env.REACT_APP_API_URL;
    // Or with Context:
    //   <ApiUrlContext.Provider value="https://fakestoreapi.com">
    //
    // How it works:
    // 1. 'provide': The TOKEN (key) - what you're asking for when you inject
    //    Think of it as a unique identifier/key in a key-value store
    //
    // 2. 'useValue': The VALUE - what you actually get when you inject
    //    This is the concrete value that will be injected
    //
    // Example usage in a service:
    //   export class AuthApi {
    //     private apiUrl = inject(API_URL);  // Gets 'environment.apiUrl'
    //   }
    //
    // React comparison:
    //   Angular:  { provide: API_URL, useValue: 'https://api.com' }
    //   React:    const API_URL = 'https://api.com'  (just import it)
    //
    // Why Angular does this:
    // - Testability: Easy to mock in tests
    // - Flexibility: Can change value based on environment
    // - Decoupling: Services don't need to know where value comes from
    {
      provide: API_URL, // The token (what to inject)
      useValue: environment.apiUrl, // The value (what you get)
    },
    // Other provider options:
    // - useClass: Provide a class instance
    //   { provide: AuthApi, useClass: MockAuthApi }
    // - useFactory: Provide value from a function
    //   { provide: API_URL, useFactory: () => getApiUrl() }
    // - useExisting: Alias to another token
    //   { provide: NewToken, useExisting: OldToken }
    provideNgToast({
      duration: 3000,
      position: 'toaster-top-right',
    }),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};

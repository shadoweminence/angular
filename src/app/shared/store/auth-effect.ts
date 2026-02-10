// ============================================================================
// AUTH EFFECTS - Side effects for async operations (API calls)
// React equivalent: Redux Thunk (createAsyncThunk) or Redux Saga
// NOT the same as useEffect hook!
// ============================================================================

import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApi } from '../services/auth-api';
import { Router } from '@angular/router';
import { authActions } from './auth-actions';
import { catchError, map, of, switchMap } from 'rxjs';

// createEffect: Listens to actions and performs side effects
// React equivalent with Redux Toolkit:
//   export const login = createAsyncThunk('auth/login', async (credentials) => {
//     const response = await authApi.login(credentials);
//     return response.data;
//   });
//
// React equivalent with Redux Saga:
//   function* loginSaga(action) {
//     try {
//       const response = yield call(authApi.login, action.payload);
//       yield put(loginSuccess(response.data));
//     } catch (error) {
//       yield put(loginFailure(error.message));
//     }
//   }
export const loginEffect = createEffect(
  (actions$ = inject(Actions), authApi = inject(AuthApi), router = inject(Router)) => {
    return actions$.pipe(
      // Listen for login action
      // React: This happens automatically in createAsyncThunk
      ofType(authActions.login),

      // switchMap: Cancel previous request if new one comes in
      // React: Built into createAsyncThunk behavior
      switchMap((loginRequest) => {
        // Make API call (returns Observable)
        // React: await authApi.login(credentials)
        return authApi.login(loginRequest).pipe(
          // On success
          map((response) => {
            // Navigate to products page
            // React: Usually done in component with useEffect watching token
            router.navigateByUrl('/products');

            // Dispatch success action
            // React: Automatically dispatched by createAsyncThunk.fulfilled
            return authActions.loginSuccess({ token: response.token });
          }),

          // On error
          // React: createAsyncThunk.rejected
          catchError((error) => {
            return of(authActions.loginFailure({ error: error.message }));
          }),
        );
      }),
    );
  },
  {
    functional: true, // New functional effect style
  },
);

// Register effect - handles user registration
// React equivalent:
//   export const register = createAsyncThunk('auth/register', async (data) => {
//     await authApi.register(data);
//     // Navigation in component: useEffect(() => { if (success) navigate('/login') }, [success])
//   });
export const registerEffect = createEffect(
  (actions$ = inject(Actions), authApi = inject(AuthApi), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap((registerRequest) => {
        return authApi.register(registerRequest).pipe(
          map(() => {
            // Navigate to login after successful registration
            router.navigateByUrl('/login');
            return authActions.registerSuccess();
          }),
          catchError((error) => {
            return of(authActions.registerFailure({ error: error.message }));
          }),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

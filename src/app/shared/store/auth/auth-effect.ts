// ============================================================================
// AUTH EFFECTS - Side effects for async operations (API calls)
// React equivalent: Redux Thunk (createAsyncThunk) or Redux Saga
// NOT the same as useEffect hook!
// ============================================================================

import { inject } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AuthApi } from '@app/shared/services/auth-api';
import { Router } from '@angular/router';
import { authActions } from '@app/shared/store/auth/auth-actions';
import { catchError, EMPTY, map, of, switchMap } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Storage } from '@services/storage';
import { ROUTES } from '@app/enums/router';

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
  (
    actions$ = inject(Actions),
    authApi = inject(AuthApi),
    router = inject(Router),
    storage = inject(Storage),
    toast = inject(NgToastService),
  ) => {
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

            router.navigateByUrl(ROUTES.HOME);
            toast.success('Login successful', 'SUCCESS');
            storage.set('token', response.token);

            // Dispatch success action
            // React: Automatically dispatched by createAsyncThunk.fulfilled
            return authActions.loginSuccess({ token: response.token });
          }),

          // On error
          // React: createAsyncThunk.rejected
          catchError((error) => {
            toast.danger(error.message, 'ERROR');
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
  (
    actions$ = inject(Actions),
    authApi = inject(AuthApi),
    router = inject(Router),
    toast = inject(NgToastService),
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap((registerRequest) => {
        return authApi.register(registerRequest).pipe(
          map(() => {
            // Navigate to login after successful registration
            router.navigateByUrl(ROUTES.LOGIN);
            toast.success('Login successful', 'SUCCESS');
            return authActions.registerSuccess();
          }),
          catchError((error) => {
            toast.danger(error.message, 'ERROR');
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

// Restore session effect - is used to check if the user is logged in or not
// React equivalent:
//   export const restoreSession = createAsyncThunk('auth/restoreSession', async () => {
//     const token = localStorage.getItem('auth_token');
//     if (!token) {
//       return null;
//     }
//     return token;
//   });

export const restoreSessionEffect = createEffect(
  (actions$ = inject(Actions), storage = inject(Storage)) => {
    return actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const token = storage.get('token');
        if (!token) {
          return authActions.logout();
        }
        return authActions.restoreSession({ token });
      }),
    );
  },
  {
    functional: true,
  },
);

// Logout effect - handles user logout and navigation
// React equivalent:
//   const handleLogout = () => {
//     localStorage.removeItem('auth_token');
//     navigate('/login');
//     dispatch(logout());
//   };
export const logoutEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router), storage = inject(Storage)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      map(() => {
        storage.remove('token');
        router.navigateByUrl(ROUTES.LOGIN);
        return { type: 'NO_ACTION' };
      }),
    );
  },
  {
    functional: true,
  },
);

import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApi } from '../services/auth-api';
import { Router } from '@angular/router';
import { authActions } from './auth-actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authApi = inject(AuthApi), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap((loginRequest) => {
        return authApi.login(loginRequest).pipe(
          map((response) => {
            router.navigateByUrl('/products');
            return authActions.loginSuccess({ token: response.token });
          }),
          catchError((error) => {
            return of(authActions.loginFailure({ error: error.message }));
          }),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authApi = inject(AuthApi), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap((registerRequest) => {
        return authApi.register(registerRequest).pipe(
          map(() => {
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

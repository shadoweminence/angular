import { inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { AuthApi } from '../services/auth-api';
import { Router } from '@angular/router';
import { authActions } from './auth-actions';

export const loginEffect = createEffect(
    (
        actions$ = inject(Actions);
       authApi = inject(AuthApi);
        router = inject(Router);
    )=>{
        return actions$.pipe(
            ofType(authActions.login),
            switchMap((loginRequest)=>{
                return authApi.login(loginRequest.pipe(
                    map((response)=>{
                        router.navigateByUrl('/products');
                        return authActions.loginSuccess({token:response.token}); 
                    }),
                    catchError((error)=>{
                        return of(authActions.loginFailure({error: error.message}));
                    })
                ))
            })
        );
    },
    {
        functional: true,
    }
);

// export const loginEffect = createEffect();

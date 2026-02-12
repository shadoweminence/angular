import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { profileActions } from './profileActions';
import { ProfileApi } from '@app/shared/services/profileApi';

export const profileEffect = createEffect(
  (actions$ = inject(Actions), profileApi = inject(ProfileApi)) => {
    return actions$.pipe(
      ofType(profileActions.getProfile),

      switchMap(({ id }) => {
        return profileApi.getProfile(id).pipe(
          map((profile) => {
            return profileActions.getProfileSuccess({ profile });
          }),

          catchError((error) => of(profileActions.getProfileFailure({ error: error.message }))),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

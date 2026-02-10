import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsLoggedIn } from '../store/auth-selectors';

// is used to make some routes only accessible after the user is logged in

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      }
      return router.parseUrl('/login');
    }),
  );
};

// ============================================================================
// AUTH GUARD - Route protection for authenticated users
// React equivalent: Protected Route component or route middleware
// ============================================================================

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsLoggedIn } from '../store/auth-selectors';

// Guard to make routes only accessible after the user is logged in
// React equivalent:
//   const ProtectedRoute = ({ children }) => {
//     const isLoggedIn = useSelector(selectIsLoggedIn);
//     return isLoggedIn ? children : <Navigate to="/login" />;
//   };
export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true; // Allow access
      }
      return router.parseUrl('/login'); // Redirect to login
    }),
  );
};

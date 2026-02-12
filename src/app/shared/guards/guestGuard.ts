// ============================================================================
// GUEST GUARD - Route protection for public routes (login, register)
// React equivalent: Public Route component or route middleware
// ============================================================================

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsLoggedIn } from '@app/shared/store/auth/auth-selectors';

// Guard to mark routes as public (login, register)
// Redirects logged-in users to products page
// React equivalent:
//   const PublicRoute = ({ children }) => {
//     const isLoggedIn = useSelector(selectIsLoggedIn);
//     return !isLoggedIn ? children : <Navigate to="/products" />;
//   };
export const guestGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) return true; // Allow access for guests
      return router.parseUrl('/'); // Redirect logged-in users
    }),
  );
};

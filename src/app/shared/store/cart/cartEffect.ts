import { inject } from '@angular/core';
import { CartApi } from '@app/shared/services/cartApi';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { cartActions } from './cartActions';

export const cartEffect = createEffect(
  (actions$ = inject(Actions), cartApi = inject(CartApi)) => {
    return actions$.pipe(
      // Listen for loadProducts action
      ofType(cartActions.getCarts),

      // switchMap: Cancel previous request if new one comes in
      switchMap(() => {
        // Make API call (returns Observable)
        // React: await productApi.getProducts()
        return cartApi.getCart().pipe(
          // On success
          map((cart) => {
            // Dispatch success action
            // React: Automatically dispatched by createAsyncThunk.fulfilled
            return cartActions.getCartsSuccess({ cart });
          }),

          // On error
          // React: createAsyncThunk.rejected
          catchError((error) => of(cartActions.getCartsFailure({ error: error.message }))),
        );
      }),
    );
  },
  {
    functional: true, // New functional effect style
  },
);

export const addCartEffect = createEffect(
  (actions$ = inject(Actions), cartApi = inject(CartApi)) => {
    return actions$.pipe(
      ofType(cartActions.addCart),
      switchMap(({ request }) => {
        return cartApi.addCart(request).pipe(
          map((cart) => {
            return cartActions.addCartSuccess({ cart });
          }),
          catchError((error) => of(cartActions.addCartFailure({ error: error.message }))),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

// ============================================================================
// AUTH EFFECTS - Side effects for async operations (API calls)
// React equivalent: Redux Thunk (createAsyncThunk) or Redux Saga
// NOT the same as useEffect hook!
// ============================================================================

import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductApi } from '../services/productApi';
import { productActions } from './productActions';

export const productEffect = createEffect(
  (actions$ = inject(Actions), productApi = inject(ProductApi)) => {
    return actions$.pipe(
      ofType(productActions.loadProducts),
      switchMap(() => {
        return productApi.getProducts().pipe(
          map((products) => {
            // Dispatch success action
            // React: Automatically dispatched by createAsyncThunk.fulfilled
            return productActions.loadProductsSuccess({ products });
          }),

          // On error
          // React: createAsyncThunk.rejected
          catchError((error) => of(productActions.loadProductsFailure({ error: error.message }))),
        );
      }),
    );
  },
  {
    functional: true, // New functional effect style
  },
);

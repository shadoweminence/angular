// ============================================================================
// PRODUCT EFFECTS - Side effects for async operations (API calls)
// React equivalent: Redux Thunk (createAsyncThunk) or Redux Saga
// NOT the same as useEffect hook!
// ============================================================================

import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductApi } from '../services/productApi';
import { productActions } from './productActions';

// createEffect: Listens to actions and performs side effects
// React equivalent with Redux Toolkit:
//   export const loadProducts = createAsyncThunk('product/loadProducts', async () => {
//     const response = await productApi.getProducts();
//     return response.data;
//   });
export const productEffect = createEffect(
  (actions$ = inject(Actions), productApi = inject(ProductApi)) => {
    return actions$.pipe(
      // Listen for loadProducts action
      ofType(productActions.loadProducts),
      
      // switchMap: Cancel previous request if new one comes in
      switchMap(() => {
        // Make API call (returns Observable)
        // React: await productApi.getProducts()
        return productApi.getProducts().pipe(
          // On success
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

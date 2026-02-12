// ============================================================================
// PRODUCT REDUCER - State management for products
// React equivalent: Redux Toolkit slice with reducers
// ============================================================================

import { CartRequest } from '@app/shared/services/cartApi';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { cartActions } from './cartActions';

// State type definition
// React: Same, defined in TypeScript or JSDoc
export type CartState = {
  cart: CartRequest[] | null;
  error: string | null;
  isLoading: boolean;
};

// Initial state
// React: Same concept in createSlice
export const initialCartState: CartState = {
  cart: null,
  error: null,
  isLoading: false,
};

export const cartFeatures = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialCartState,

    // Handle loadProducts action (start loading)
    // React: .addCase(loadProducts.pending, (state) => { ... })
    on(cartActions.getCarts, (state) => ({
      ...state,
      isLoading: true,
    })),

    // Handle loadProductsSuccess action
    // React: .addCase(loadProducts.fulfilled, (state, action) => { ... })
    on(cartActions.getCartsSuccess, (state, { cart }) => ({
      ...state,
      cart,
      isLoading: false,
    })),

    // Handle loadProductsFailure action
    // React: .addCase(loadProducts.rejected, (state, action) => { ... })
    on(cartActions.getCartsFailure, (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    })),

    // Handle setCategoryFilter action
    // React: .addCase(setCategoryFilter, (state, action) => { ... })
    on(cartActions.addCart, (state) => ({
      ...state,
    })),

    on(cartActions.addCartSuccess, (state, { cart }) => ({
      ...state,
      cart: state.cart ? [...state.cart, cart] : [cart],
      isLoading: false,
    })),

    on(cartActions.addCartFailure, (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    })),
  ),
});

// Selector to get products from state
// React: Same concept with reselect library
//   const selectProducts = (state) => state.product.products;
export const selectCart = createSelector(cartFeatures.selectCart, (cart) => cart);

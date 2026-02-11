// ============================================================================
// PRODUCT REDUCER - State management for products
// React equivalent: Redux Toolkit slice with reducers
// ============================================================================

import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ProductResponse } from '../services/productApi';
import { productActions } from './productActions';

// State type definition
// React: Same, defined in TypeScript or JSDoc
export type ProductState = {
  products: ProductResponse[] | null;
  error: string | null;
  isLoading: boolean;
  categoryFilter: 'male' | 'female' | 'jewelery' | 'electronics' | null;
};

// Initial state
// React: Same concept in createSlice
export const initialProductState: ProductState = {
  products: null,
  error: null,
  isLoading: false,
  categoryFilter: null,
};

// createFeature: Creates a feature state with reducer
// React equivalent with Redux Toolkit:
//   const productSlice = createSlice({
//     name: 'product',
//     initialState,
//     extraReducers: (builder) => {
//       builder
//         .addCase(loadProducts.pending, (state) => { state.isLoading = true })
//         .addCase(loadProducts.fulfilled, (state, action) => { state.products = action.payload })
//         .addCase(loadProducts.rejected, (state, action) => { state.error = action.error.message })
//     }
//   });
export const productFeatures = createFeature({
  name: 'product',
  reducer: createReducer(
    initialProductState,

    // Handle loadProducts action (start loading)
    // React: .addCase(loadProducts.pending, (state) => { ... })
    on(productActions.loadProducts, (state) => ({
      ...state,
      isLoading: true,
    })),

    // Handle loadProductsSuccess action
    // React: .addCase(loadProducts.fulfilled, (state, action) => { ... })
    on(productActions.loadProductsSuccess, (state, { products }) => ({
      ...state, // Spread operator for immutability
      products,
      isLoading: false,
    })),

    // Handle loadProductsFailure action
    // React: .addCase(loadProducts.rejected, (state, action) => { ... })
    on(productActions.loadProductsFailure, (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    })),

    // Handle setCategoryFilter action
    // React: .addCase(setCategoryFilter, (state, action) => { ... })
    on(productActions.setCategoryFilter, (state, { category }) => ({
      ...state,
      categoryFilter: category,
    })),
  ),
});

// Selector to get products from state
// React: Same concept with reselect library
//   const selectProducts = (state) => state.product.products;
export const selectProducts = createSelector(
  productFeatures.selectProducts,
  (products) => products,
);

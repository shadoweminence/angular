import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ProductResponse } from '../services/productApi';
import { productActions } from './productActions';

export type ProductState = {
  products: ProductResponse[] | null;
  error: string | null;
  isLoading: boolean;
};

export const initialProductState: ProductState = {
  products: null,
  error: null,
  isLoading: false,
};

export const productFeatures = createFeature({
  name: 'product',
  reducer: createReducer(
    initialProductState,

    on(productActions.loadProducts, (state) => ({
      ...state,
      isLoading: true,
    })),

    on(productActions.loadProductsSuccess, (state, { products }) => ({
      ...state, // Spread operator for immutability
      products,
      isLoading: false,
    })),

    on(productActions.loadProductsFailure, (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    })),
  ),
});

export const selectProducts = createSelector(
  productFeatures.selectProducts,
  (products) => products,
);

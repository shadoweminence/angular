// ============================================================================
// AUTH ACTIONS - Redux action definitions
// React equivalent: Action creators in Redux Toolkit slice
// ============================================================================

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductResponse } from '../services/productApi';

export const productActions = createActionGroup({
  source: 'Product', // Namespace for actions
  events: {
    loadProducts: emptyProps(),
    loadProductsSuccess: props<{ products: ProductResponse[] }>(), // No payload needed
    loadProductsFailure: props<{ error: string }>(),
  },
});

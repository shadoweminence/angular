// ============================================================================
// PRODUCT ACTIONS - Redux action definitions
// React equivalent: Action creators in Redux Toolkit slice
// ============================================================================

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductResponse } from '../services/productApi';

// createActionGroup: Creates a group of related actions
// React equivalent: In Redux Toolkit, actions are auto-generated in createSlice
export const productActions = createActionGroup({
  source: 'Product', // Namespace for actions
  events: {
    // Load products actions
    // React: dispatch(loadProducts())
    loadProducts: emptyProps(),
    loadProductsSuccess: props<{ products: ProductResponse[] }>(),
    loadProductsFailure: props<{ error: string }>(),
    
    // Filter products action
    // React: dispatch(setCategoryFilter({ category: 'male' }))
    'Set Category Filter': props<{ category: 'male' | 'female' | 'jewelery' | 'electronics' | null }>(),
  },
});

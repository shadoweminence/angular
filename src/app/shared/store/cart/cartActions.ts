// ============================================================================
// PRODUCT ACTIONS - Redux action definitions
// React equivalent: Action creators in Redux Toolkit slice
// ============================================================================

import { CartRequest } from '@app/shared/services/cartApi';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

// createActionGroup: Creates a group of related actions
// React equivalent: In Redux Toolkit, actions are auto-generated in createSlice
export const cartActions = createActionGroup({
  source: 'Cart', // Namespace for actions
  events: {
    // Load products actions
    // React: dispatch(loadProducts())
    getCarts: emptyProps(),
    getCartsSuccess: props<{ cart: CartRequest[] }>(),
    getCartsFailure: props<{ error: string }>(),

    addCart: props<{ request: CartRequest }>(),
    addCartSuccess: props<{ cart: CartRequest }>(),
    addCartFailure: props<{ error: string }>(),
  },
});

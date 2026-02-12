// ============================================================================
// PRODUCT REDUCER - State management for products
// React equivalent: Redux Toolkit slice with reducers
// ============================================================================

import { CartRequest } from '@app/shared/services/cartApi';
import { ProfileResponse } from '@app/shared/services/profileApi';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { profileActions } from './profileActions';

// State type definition
// React: Same, defined in TypeScript or JSDoc
export type ProfileState = {
  profile: ProfileResponse | null;
  error: string | null;
  isLoading: boolean;
};

// Initial state
// React: Same concept in createSlice
export const initialProfileState: ProfileState = {
  profile: null,
  error: null,
  isLoading: false,
};

export const profileFeatures = createFeature({
  name: 'profile',
  reducer: createReducer(
    initialProfileState,

    // Handle loadProducts action (start loading)
    // React: .addCase(loadProducts.pending, (state) => { ... })
    on(profileActions.getProfile, (state) => ({
      ...state,
      isLoading: true,
    })),

    // Handle loadProductsSuccess action
    // React: .addCase(loadProducts.fulfilled, (state, action) => { ... })
    on(profileActions.getProfileSuccess, (state, { profile }) => ({
      ...state,
      profile,
      isLoading: false,
    })),

    // Handle loadProductsFailure action
    // React: .addCase(loadProducts.rejected, (state, action) => { ... })
    on(profileActions.getProfileFailure, (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    })),
  ),
});

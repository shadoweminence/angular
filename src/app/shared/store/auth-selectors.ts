// ============================================================================
// AUTH SELECTORS
// ----------------------------------------------------------------------------
// This file contains derived selectors for the Auth feature state.
//
// Selectors are used to read and compute values from the NgRx store
// in a reusable and memoized way. Instead of directly accessing raw
// state fields (like token), we expose semantic selectors such as
// "selectIsLoggedIn" that describe business meaning.
//
// Benefits:
// - Keeps components and guards clean
// - Centralizes auth-related state queries
// - Enables memoization for performance
// - Makes future state refactors safer
//
// Used by:
// - Auth guards (route protection)
// - Components (UI auth checks)
// - Effects (conditional flows)
// ============================================================================

import { createSelector } from '@ngrx/store';
import { authFeatures } from './auth-features';

export const selectIsLoggedIn = createSelector(authFeatures.selectToken, (token) => !!token);

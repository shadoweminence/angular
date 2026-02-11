// ============================================================================
// AUTH REDUCER - State management for authentication
// React equivalent: Redux Toolkit slice with reducers
// ============================================================================

import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from '@store/auth-actions';

// State type definition
// React: Same, defined in TypeScript or JSDoc
export type AuthState = {
  token: string | null;
  userId: number | null;
  error: string | null;
  isLoading: boolean;
};

// Helper to get token from storage on initialization
const getInitialToken = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    try {
      return token ? JSON.parse(token) : null;
    } catch {
      return token; // fallback if not JSON
    }
  }
  return null;
};

// Initial state
// React: Same concept in createSlice
export const initialAuthState: AuthState = {
  token: getInitialToken(),
  userId: null,
  error: null,
  isLoading: false,
};

// createFeature: Creates a feature state with reducer
// React equivalent with Redux Toolkit:
//   const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(login.pending, (state) => { state.isLoading = true })
//         .addCase(login.fulfilled, (state, action) => { state.token = action.payload })
//         .addCase(login.rejected, (state, action) => { state.error = action.error.message })
//     }
//   });
export const authFeatures = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,

    // Handle loginSuccess action
    // React: .addCase(login.fulfilled, (state, action) => { ... })
    on(authActions.loginSuccess, (state, { token }) => ({
      ...state, // Spread operator for immutability
      token,
      isLoading: false,
    })),

    // Handle loginFailure action
    // React: .addCase(login.rejected, (state, action) => { ... })
    on(authActions.loginFailure, (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    })),

    // Handle login action (start loading)
    // React: .addCase(login.pending, (state) => { ... })
    on(authActions.login, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    // Register actions
    on(authActions.registerSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(authActions.registerFailure, (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    })),

    on(authActions.register, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(authActions.restoreSession, (state, { token }) => ({
      ...state,
      token,
    })),

    on(authActions.logout, (state) => ({
      ...state,
      token: null,
      userId: null,
      error: null,
      isLoading: false,
    })),
  ),
});

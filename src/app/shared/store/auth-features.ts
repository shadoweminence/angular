import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './auth-actions';

export type AuthState = {
  token: string | null;
  userId: number | null;
  error: string | null;
  isLoading: boolean;
};

export const initialAuthState: AuthState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
};

export const authFeatures = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,
    on(authActions.loginSuccess, (state, { token }) => ({
      ...state,
      token,
      isLoading: false,
    })),

    on(authActions.loginFailure, (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    })),

    on(authActions.login, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

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
  ),
});

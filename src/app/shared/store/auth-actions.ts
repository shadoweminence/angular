// ============================================================================
// AUTH ACTIONS - Redux action definitions
// React equivalent: Action creators in Redux Toolkit slice
// ============================================================================

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequest } from '../services/auth-api';

// createActionGroup: Creates a group of related actions
// React equivalent: In Redux Toolkit, actions are auto-generated in createSlice
// Example React:
//   const authSlice = createSlice({
//     name: 'auth',
//     reducers: {
//       login: (state, action) => { ... },
//       loginSuccess: (state, action) => { ... }
//     }
//   });
export const authActions = createActionGroup({
  source: 'Auth', // Namespace for actions
  events: {
    // Login actions
    // React: dispatch(login({ username, password }))
    login: props<{ username: string; password: string }>(),
    loginSuccess: props<{ token: string }>(),
    loginFailure: props<{ error: string }>(),

    // Register actions
    // React: dispatch(register({ username, email, password, confirmPassword }))
    register: props<RegisterRequest>(),
    registerSuccess: emptyProps(), // No payload needed
    registerFailure: props<{ error: string }>(),
  },
});

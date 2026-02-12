import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const profileActions = createActionGroup({
  source: 'Profile', // Namespace for actions
  events: {
    getProfile: props<{ id: number }>(),
    getProfileSuccess: props<{ profile: any }>(),
    getProfileFailure: props<{ error: string }>(),
  },
});

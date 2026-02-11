export const VALIDATION_MESSAGES = {
  USERNAME_REQUIRED: 'Username is required',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters long',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm Password is required',
  PASSWORD_MISMATCH: 'Passwords do not match',
} as const;

export const PASSWORD_MIN_LENGTH = 6;

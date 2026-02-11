import { minLength, required, schema, validate } from '@angular/forms/signals';
import { PASSWORD_MIN_LENGTH, VALIDATION_MESSAGES } from '@shared/constants/validation.constants';

export type RegisterModel = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerSchema = schema<RegisterModel>((rootPath) => {
  required(rootPath.username, { message: VALIDATION_MESSAGES.USERNAME_REQUIRED });
  required(rootPath.email, { message: VALIDATION_MESSAGES.EMAIL_REQUIRED });
  required(rootPath.password, { message: VALIDATION_MESSAGES.PASSWORD_REQUIRED });
  minLength(rootPath.password, PASSWORD_MIN_LENGTH, {
    message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH,
  });
  required(rootPath.confirmPassword, { message: VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED });
  validate(rootPath.confirmPassword, ({ value, valueOf }) => {
    const password = valueOf(rootPath.password);
    const confirmPassword = value();

    if (!password) {
      return null;
    }

    if (password !== confirmPassword) {
      return {
        kind: 'passwordMismatch',
        message: VALIDATION_MESSAGES.PASSWORD_MISMATCH,
      };
    }
    return null;
  });
});

// ============================================================================
// LOGIN COMPONENT - User login form with validation
// React equivalent: Functional component with form handling
// ============================================================================

import { Component, inject, signal } from '@angular/core';
import { Button } from '@components/button';
import { RouterLink } from '@angular/router';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { FormErrors } from '@components/form-errors';
import { Store } from '@ngrx/store';
import { authActions } from '@store/auth-actions';
import { PASSWORD_MIN_LENGTH, VALIDATION_MESSAGES } from '@shared/constants/validation.constants';

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink, FormField, FormsModule, FormErrors],
  templateUrl: './login.html',
  host: {
    class: 'min-h-screen flex items-center justify-center p-4',
  },
})
export class Login {
  private readonly store = inject(Store);

  // Form model with initial values
  // React: const [formData, setFormData] = useState({ username: '', password: '' })
  readonly loginModel = signal({
    username: '',
    password: '',
  });

  // Form with validation rules
  // React: Using libraries like react-hook-form or formik
  readonly loginForm = form(this.loginModel, (rootPath) => {
    required(rootPath.username, { message: VALIDATION_MESSAGES.USERNAME_REQUIRED });
    required(rootPath.password, { message: VALIDATION_MESSAGES.PASSWORD_REQUIRED });
    minLength(rootPath.password, PASSWORD_MIN_LENGTH, {
      message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH,
    });
  });

  // Handle form submission
  // React: const handleSubmit = (e) => { e.preventDefault(); dispatch(login(formData)) }
  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.loginForm().valid()) {
      this.store.dispatch(authActions.login(this.loginForm().value()));
    }
  }
}

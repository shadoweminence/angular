// ============================================================================
// REGISTER COMPONENT - User registration form with validation
// React equivalent: Functional component with form handling
// ============================================================================

import { Component, inject, signal } from '@angular/core';
import { Button } from '@components/button';
import { RouterLink } from '@angular/router';
import { form, FormField } from '@angular/forms/signals';
import { FormErrors } from '@components/form-errors';
import { registerSchema } from './register-schema';
import { Store } from '@ngrx/store';
import { authActions } from '@store/auth-actions';

@Component({
  selector: 'app-register',
  imports: [Button, RouterLink, FormField, FormErrors],
  templateUrl: './register.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg p-4',
  },
})
export class Register {
  private readonly store = inject(Store);

  // Form model with initial values
  // React: const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  readonly registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Form with validation schema
  // React: Using libraries like react-hook-form with yup or zod
  readonly registerForm = form(this.registerModel, registerSchema);

  // Handle form submission
  // React: const handleSubmit = (e) => { e.preventDefault(); dispatch(register(formData)) }
  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.registerForm().valid()) {
      this.store.dispatch(authActions.register(this.registerForm().value()));
    }
  }
}

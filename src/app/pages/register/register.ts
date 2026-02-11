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

  readonly registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  readonly registerForm = form(this.registerModel, registerSchema);

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.registerForm().valid()) {
      this.store.dispatch(authActions.register(this.registerForm().value()));
    }
  }
}

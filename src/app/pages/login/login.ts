// ============================================================================
// LOGIN COMPONENT - User authentication form
// React equivalent: function Login() { ... }
// ============================================================================

import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router'; // React: import { Link } from 'react-router-dom'
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { FormErrors } from '../../shared/components/form-errors';
import { Store } from '@ngrx/store'; // React: import { useDispatch } from 'react-redux'
import { authActions } from '../../shared/store/auth-actions';

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink, FormField, FormsModule, FormErrors],
  template: `
    <div class="w-full max-w-md">
      <div class="bg-white p-8 rounded-xl shadow-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
        <!-- (ngSubmit): Event binding, React: onSubmit={handleSubmit} -->
        <form (ngSubmit)="onSubmit($event)">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2"
              >username</label
            >
            <!-- [formField]: Property binding, React: {...register('username')} -->
            <input
              type="username"
              id="username"
              [formField]="loginForm.username"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <!-- Component with input binding, React: <FormErrors control={loginForm.username} /> -->
            <app-form-errors [control]="loginForm.username()"></app-form-errors>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2"
              >Password</label
            >
            <input
              type="password"
              id="password"
              [formField]="loginForm.password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <app-form-errors [control]="loginForm.password()"></app-form-errors>
          </div>
          <!-- appButton: Directive, React: custom component or className -->
          <!-- [disabled]: Property binding, React: disabled={!isValid} -->
          <button
            appButton
            [disabled]="!loginForm().valid()"
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          <p class="text-center text-sm text-gray-600 mt-4">
            Don't have an account?
            <!-- routerLink: Navigation, React: <Link to="/register"> -->
            <a routerLink="/register" class="text-blue-500 hover:underline">Register</a>
          </p>
        </form>
      </div>
    </div>
  `,
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class Login {
  // inject(): Dependency Injection to get Store instance
  // React equivalent: const dispatch = useDispatch()
  private store = inject(Store);

  // signal(): Reactive state primitive
  // React equivalent: const [loginModel, setLoginModel] = useState({ username: '', password: '' })
  loginModel = signal({
    username: '',
    password: '',
  });

  // form(): Signal-based form with validation schema
  // React equivalent: const { register, handleSubmit, formState } = useForm()
  loginForm = form(this.loginModel, (rootPath) => {
    // Validation rules
    // React equivalent: register('username', { required: 'username is required' })
    required(rootPath.username, { message: 'username is required' });
    required(rootPath.password, { message: 'Password is required' });
    minLength(rootPath.password, 6, { message: 'Password must be at least 6 characters long' });
  });

  // Method to handle form submission
  // React equivalent: const handleSubmit = (e) => { ... }
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      // Dispatch action to NgRx store
      // React equivalent: dispatch(login(formData))
      this.store.dispatch(authActions.login(this.loginForm().value()));
    }
  }
}

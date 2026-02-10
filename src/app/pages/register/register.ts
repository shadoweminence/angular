import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router';
import { form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { FormErrors } from '../../shared/components/form-errors';
import { registerSchema } from './register-schema';

@Component({
  selector: 'app-register',
  imports: [Button, RouterLink, FormField, FormErrors],
  template: `
    <div class="w-full max-w-md">
      <div class="bg-white p-8 rounded-xl shadow-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>
        <form>
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              [formField]="registerForm.username"
              id="name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <app-form-errors [control]="registerForm.username()"></app-form-errors>
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              [formField]="registerForm.email"
              id="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <app-form-errors [control]="registerForm.email()"></app-form-errors>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2"
              >Password</label
            >
            <input
              type="password"
              [formField]="registerForm.password"
              id="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <app-form-errors [control]="registerForm.password()"></app-form-errors>
          </div>
          <div class="mb-4">
            <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-2"
              >Confirm Password</label
            >
            <input
              type="password"
              [formField]="registerForm.confirmPassword"
              id="confirm-password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <app-form-errors [control]="registerForm.confirmPassword()"></app-form-errors>
          </div>
          <button
            (click)="onSubmit($event)"
            [disabled]="!registerForm().valid()"
            appButton
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
          <p class="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <a routerLink="/login" class="text-blue-500 hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  `,
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class Register {
  registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, registerSchema);
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm().valid()) {
      console.log('Login Data: ', this.registerForm().value());
    } else {
      console.log('Form is invalid');
    }
  }
}

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
  templateUrl: './login.html',
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

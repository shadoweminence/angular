// ============================================================================
// REGISTER COMPONENT - User registration form
// React equivalent: function Register() { ... }
// ============================================================================

import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router';
import { form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { FormErrors } from '../../shared/components/form-errors';
import { registerSchema } from './register-schema';
import { Store } from '@ngrx/store'; // React: useDispatch hook
import { authActions } from '../../shared/store/auth-actions';

@Component({
  selector: 'app-register',
  imports: [Button, RouterLink, FormField, FormErrors],
  templateUrl: './register.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class Register {
  // Inject Store for dispatching actions
  // React: const dispatch = useDispatch()
  private store = inject(Store);

  // Signal for form state
  // React: const [registerModel, setRegisterModel] = useState({ ... })
  registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Form with external validation schema
  // React: useForm with yup/zod schema
  registerForm = form(this.registerModel, registerSchema);

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm().valid()) {
      // Dispatch register action to store
      // React: dispatch(register(formData))
      this.store.dispatch(authActions.register(this.registerForm().value()));
    }
  }
}

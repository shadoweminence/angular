# Angular vs React: Complete App Comparison

This document provides a detailed comparison between your Angular app and how the same concepts would be implemented in React.

---

## 1. **App Configuration & Setup**

### Angular (`app.config.ts`)
```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),              // React: BrowserRouter
    provideHttpClient(),                // React: axios/fetch (no provider needed)
    provideStore({ auth: authReducer }), // React: Redux createStore/configureStore
    provideEffects({ loginEffect }),     // React: Redux middleware (redux-thunk/saga)
    { provide: API_URL, useValue: '...' } // React: .env file or context
  ],
};
```

### React Equivalent
```jsx
// App.jsx
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>  {/* = provideStore */}
      <BrowserRouter>         {/* = provideRouter */}
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: { auth: authReducer },  // = provideStore
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(/* thunks */), // = provideEffects
});
```

**Key Differences:**
- Angular: Dependency Injection at app level
- React: Component wrapping (Provider pattern)

---

## 2. **Routing**

### Angular (`app.routes.ts`)
```typescript
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
  },
  {
    path: '',
    loadComponent: () => import('./pages/main-layout').then(m => m.MainLayout),
    children: [
      { path: 'products', loadComponent: () => import('./pages/products') }
    ]
  }
];
```

### React Equivalent
```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./pages/Login'));
const MainLayout = lazy(() => import('./pages/MainLayout'));
const Products = lazy(() => import('./pages/Products'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
```

**Key Differences:**
- Angular: Configuration-based routing (declarative)
- React: Component-based routing (JSX)
- Both support lazy loading

---

## 3. **Components**

### Angular (`login.ts`)
```typescript
@Component({
  selector: 'app-login',
  imports: [Button, RouterLink, FormField],
  template: `
    <div class="w-full max-w-md">
      <h1>Login</h1>
      <form (ngSubmit)="onSubmit($event)">
        <input [formField]="loginForm.username" />
        <button type="submit">Login</button>
      </form>
    </div>
  `,
})
export class Login {
  private store = inject(Store);
  
  loginModel = signal({ username: '', password: '' });
  loginForm = form(this.loginModel, validationSchema);
  
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      this.store.dispatch(authActions.login(this.loginForm().value()));
    }
  }
}
```

### React Equivalent
```jsx
// Login.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: '', password: '' });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  
  return (
    <div className="w-full max-w-md">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
```

**Key Differences:**
- Angular: `@Component` decorator, class-based
- React: Function components
- Angular: `inject()` for DI
- React: `useDispatch()` hook
- Angular: `signal()` for state
- React: `useState()` hook

---

## 4. **State Management (NgRx vs Redux)**

### Angular - Actions (`auth-actions.ts`)
```typescript
export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ username: string; password: string }>(),
    loginSuccess: props<{ token: string }>(),
    loginFailure: props<{ error: string }>(),
  },
});
```

### React - Redux Toolkit Slice
```jsx
// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    const response = await authApi.login({ username, password });
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, error: null, isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});
```

**Key Differences:**
- Angular: Separate actions, reducers, effects
- React: Combined in slice (Redux Toolkit)
- Angular: More verbose, explicit
- React: More concise with createAsyncThunk

---

## 5. **Reducers**

### Angular (`auth-features.ts`)
```typescript
export const authFeatures = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,
    on(authActions.login, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(authActions.loginSuccess, (state, { token }) => ({
      ...state,
      token,
      isLoading: false,
    })),
  ),
});
```

### React Equivalent
```jsx
// Already shown in authSlice above - Redux Toolkit combines this
```

**Key Differences:**
- Angular: `createFeature` + `createReducer` + `on()`
- React: `createSlice` handles everything
- Angular: Immutable updates with spread operator
- React: Redux Toolkit uses Immer (mutable-looking code)

---

## 6. **Side Effects (Effects vs Thunks/Sagas)**

### Angular (`auth-effect.ts`)
```typescript
export const loginEffect = createEffect(
  (actions$ = inject(Actions), authApi = inject(AuthApi), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap((loginRequest) => {
        return authApi.login(loginRequest).pipe(
          map((response) => {
            router.navigateByUrl('/products');
            return authActions.loginSuccess({ token: response.token });
          }),
          catchError((error) => {
            return of(authActions.loginFailure({ error: error.message }));
          }),
        );
      }),
    );
  },
  { functional: true }
);
```

### React - Redux Thunk (shown in slice above)
```jsx
// Using createAsyncThunk (already shown)
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.login({ username, password });
      // Navigation in component using useEffect
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// In component:
const navigate = useNavigate();
useEffect(() => {
  if (token) navigate('/products');
}, [token, navigate]);
```

### React - Redux Saga Alternative
```jsx
// authSaga.js
function* loginSaga(action) {
  try {
    const response = yield call(authApi.login, action.payload);
    yield put(loginSuccess(response.data));
    yield call(navigate, '/products');
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* watchLogin() {
  yield takeLatest('auth/login', loginSaga);
}
```

**Key Differences:**
- Angular: RxJS Observables (reactive streams)
- React: Promises (async/await) or Generators (sagas)
- Angular: `provideEffects()` registers effects
- React: Thunks built-in, Sagas need middleware
- Angular: Effects are NOT like `useEffect` - they're middleware for async actions
- React `useEffect`: Side effects in components (like Angular lifecycle hooks)

---

## 7. **Signals vs Hooks**

### Angular Signals
```typescript
export class Login {
  loginModel = signal({ username: '', password: '' });
  
  updateUsername(value: string) {
    this.loginModel.update(state => ({ ...state, username: value }));
  }
  
  // Computed signal
  isValid = computed(() => this.loginModel().username.length > 0);
}
```

### React Hooks
```jsx
function Login() {
  const [loginModel, setLoginModel] = useState({ username: '', password: '' });
  
  const updateUsername = (value) => {
    setLoginModel(prev => ({ ...prev, username: value }));
  };
  
  // Computed value
  const isValid = useMemo(() => loginModel.username.length > 0, [loginModel]);
  
  return <div>...</div>;
}
```

**Key Differences:**
- Angular: `signal()` + `computed()`
- React: `useState()` + `useMemo()`
- Angular: Fine-grained reactivity
- React: Component re-renders on state change

---

## 8. **Dependency Injection**

### Angular
```typescript
export class Login {
  private store = inject(Store);
  private authApi = inject(AuthApi);
  private router = inject(Router);
}
```

### React
```jsx
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Services usually imported directly or use Context
  const authApi = useContext(AuthApiContext);
}
```

**Key Differences:**
- Angular: Built-in DI system with `inject()`
- React: Hooks + Context API (manual DI)
- Angular: Services are singletons by default
- React: Context can cause re-renders

---

## 9. **Forms**

### Angular Signal Forms
```typescript
loginForm = form(this.loginModel, (rootPath) => {
  required(rootPath.username, { message: 'Username is required' });
  minLength(rootPath.password, 6, { message: 'Min 6 chars' });
});

// In template
<input [formField]="loginForm.username" />
<app-form-errors [control]="loginForm.username()" />
```

### React - React Hook Form
```jsx
import { useForm } from 'react-hook-form';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    dispatch(login(data));
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username', { required: 'Username is required' })} />
      {errors.username && <span>{errors.username.message}</span>}
    </form>
  );
}
```

**Key Differences:**
- Angular: Signal-based forms (new) or Reactive Forms
- React: Uncontrolled (React Hook Form) or Controlled (useState)
- Angular: Built-in validation
- React: Library-based validation

---

## 10. **HTTP Requests**

### Angular (`auth-api.ts`)
```typescript
@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly baseApiUrl = inject(API_URL);
  private readonly http = inject(HttpClient);

  login(request: LoginRequest) {
    const url = `${this.baseApiUrl}/auth/login`;
    return this.http.post<LoginResponse>(url, request);
  }
}
```

### React
```jsx
// authApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const authApi = {
  login: (request) => {
    return axios.post(`${API_URL}/auth/login`, request);
  }
};

// Or with fetch
export const authApi = {
  login: async (request) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    return response.json();
  }
};
```

**Key Differences:**
- Angular: `HttpClient` (Observable-based)
- React: axios/fetch (Promise-based)
- Angular: Injected service
- React: Imported module

---

## 11. **Component Communication**

### Angular - Input/Output
```typescript
// Parent
<app-button (click)="handleClick()" [disabled]="isDisabled" />

// Child (button.ts)
export class Button {
  @Input() disabled = false;
  @Output() click = new EventEmitter<void>();
}
```

### React - Props
```jsx
// Parent
<Button onClick={handleClick} disabled={isDisabled} />

// Child
function Button({ onClick, disabled }) {
  return <button onClick={onClick} disabled={disabled}>Click</button>;
}
```

**Key Differences:**
- Angular: `@Input()` / `@Output()` decorators
- React: Props (simpler)
- Angular: EventEmitter for events
- React: Functions as props

---

## 12. **Lifecycle Hooks**

### Angular
```typescript
export class Login implements OnInit, OnDestroy {
  ngOnInit() {
    // Like React useEffect(() => {}, [])
    console.log('Component mounted');
  }
  
  ngOnDestroy() {
    // Like React useEffect cleanup
    console.log('Component unmounted');
  }
}
```

### React
```jsx
function Login() {
  useEffect(() => {
    // ngOnInit
    console.log('Component mounted');
    
    return () => {
      // ngOnDestroy
      console.log('Component unmounted');
    };
  }, []);
}
```

---

## 13. **Lazy Loading**

### Angular
```typescript
{
  path: 'login',
  loadComponent: () => import('./pages/login/login').then(m => m.Login),
}
```

### React
```jsx
const Login = lazy(() => import('./pages/Login'));

<Suspense fallback={<Loading />}>
  <Login />
</Suspense>
```

**Both are similar!**

---

## 14. **Environment Variables**

### Angular
```typescript
// app.config.ts
export const API_URL = new InjectionToken<string>('API_URL');

providers: [
  { provide: API_URL, useValue: 'https://api.example.com' }
]

// Usage
private apiUrl = inject(API_URL);
```

### React
```jsx
// .env
REACT_APP_API_URL=https://api.example.com

// Usage
const apiUrl = process.env.REACT_APP_API_URL;
```

---

## Summary Table

| Feature | Angular | React |
|---------|---------|-------|
| **Components** | Class-based with decorators | Function components |
| **State** | Signals / RxJS | useState / useReducer |
| **Side Effects** | NgRx Effects (RxJS) | Redux Thunk / Saga |
| **Routing** | Config-based | Component-based |
| **DI** | Built-in inject() | Context / Hooks |
| **Forms** | Signal Forms / Reactive | Hook Form / Controlled |
| **HTTP** | HttpClient (Observable) | axios/fetch (Promise) |
| **Styling** | Component styles | CSS Modules / Styled |
| **Learning Curve** | Steeper | Gentler |
| **Bundle Size** | Larger | Smaller |
| **Type Safety** | TypeScript first | Optional TypeScript |

---

## Key Conceptual Mappings

```
Angular                          →  React
─────────────────────────────────────────────────────────
@Component                       →  function Component()
signal()                         →  useState()
computed()                       →  useMemo()
inject()                         →  useContext() / import
provideStore()                   →  <Provider store={store}>
provideEffects()                 →  Redux middleware
createEffect()                   →  createAsyncThunk() / saga
ngOnInit()                       →  useEffect(() => {}, [])
ngOnDestroy()                    →  useEffect cleanup
@Input()                         →  props
@Output()                        →  callback props
[property]                       →  {property}
(event)                          →  {onEvent}
*ngIf                            →  {condition && <Component />}
*ngFor                           →  {array.map(item => <Item />)}
HttpClient                       →  axios / fetch
RouterLink                       →  <Link to="..." />
```

---

## When to Use Which?

### Choose Angular if:
- Large enterprise applications
- Need strong typing and structure
- Team prefers OOP and classes
- Want built-in solutions (DI, HTTP, Forms)
- Long-term maintainability is priority

### Choose React if:
- Faster development cycles
- Smaller bundle size matters
- Team prefers functional programming
- Need more flexibility in architecture
- Large ecosystem of third-party libraries

Both are excellent choices! Angular is more opinionated and structured, while React is more flexible and lightweight.

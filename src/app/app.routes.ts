// ============================================================================
// ROUTING CONFIGURATION - Defines all application routes
// React equivalent: <Routes> with <Route> components in App.jsx
// ============================================================================

import { Routes } from '@angular/router';

// Routes array: Configuration-based routing (declarative)
// React equivalent: Component-based routing with JSX
export const routes: Routes = [
  // Simple route with lazy loading
  // React: <Route path="/login" element={<Login />} />
  {
    path: 'login',
    // loadComponent: Code splitting / lazy loading
    // React equivalent: const Login = lazy(() => import('./pages/Login'))
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    // Dynamic import for bundle optimization
    // React: Wrap with <Suspense fallback={<Loading />}>
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },

  // Nested routes with layout
  // React: <Route path="/" element={<MainLayout />}> with nested <Route> inside
  {
    path: '',
    loadComponent: () => import('./pages/main-layout').then((m) => m.MainLayout),
    canActivate: [], // Route guards (auth protection)
    // React equivalent: Protected Route wrapper or check in component with useEffect
    children: [
      // Child routes render inside parent's <router-outlet>
      // React: Child routes render in parent's <Outlet />
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products').then((m) => m.Products),
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
      },
    ],
  },
];

// ============================================================================
// MAIN LAYOUT COMPONENT - Wrapper with header and footer
// React equivalent: Layout component with Outlet
// ============================================================================

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // React: import { Outlet } from 'react-router-dom'
import { Header } from '../core/components/header';
import { Footer } from '../core/components/footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <!-- Self-closing component tags (Angular 17+) -->
    <!-- React: <Header /> -->
    <app-header />

    <!-- RouterOutlet: Renders child routes here -->
    <!-- React equivalent: <Outlet /> -->
    <router-outlet />

    <!-- React: <Footer /> -->
    <app-footer />
  `,
})
export class MainLayout {
  // constructor: Runs when component is created
  // React equivalent: Code at top of function component or useEffect with empty deps
  //   useEffect(() => {
  //     console.log('Main Layout initialized');
  //   }, []);
  constructor() {
    console.log('Main Layout initialized');
  }
}

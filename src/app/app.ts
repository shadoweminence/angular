// ============================================================================
// ROOT COMPONENT - Entry point of the application
// React equivalent: function App() { return <div>...</div> }
// ============================================================================

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // React: <Outlet /> from react-router-dom

// @Component decorator: Defines metadata for the component
// React equivalent: Just export a function component (no decorator needed)
@Component({
  selector: 'app-root', // HTML tag to use: <app-root></app-root>
  imports: [RouterOutlet], // Components/directives used in template
  templateUrl: './app.html', // External template file
  styleUrl: './app.css', // Component-scoped styles
})
export class App {
  // signal(): Angular's reactive primitive for state management
  // React equivalent: const [title, setTitle] = useState('ngrx-store')
  // Signals provide fine-grained reactivity without re-rendering entire component
  protected readonly title = signal('ngrx-store');
}

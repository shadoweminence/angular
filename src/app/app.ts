// ============================================================================
// ROOT COMPONENT - Entry point of the application
// React equivalent: function App() { return <div>...</div> }
// ============================================================================
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // React: <Outlet /> from react-router-dom
import { NgToastComponent } from 'ng-angular-popup';

// @Component decorator: Defines metadata for the component
// React equivalent: Just export a function component (no decorator needed)
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // signal(): Angular's reactive primitive for state management
  // React equivalent: const [title, setTitle] = useState('ngrx-store')
  // Signals provide fine-grained reactivity without re-rendering entire component
  protected readonly title = signal('ngrx-store');
}

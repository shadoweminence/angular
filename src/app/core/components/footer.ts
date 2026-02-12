// ============================================================================
// FOOTER COMPONENT - Application footer with dynamic copyright year
// React equivalent: Functional component
// ============================================================================

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTES } from '@app/enums/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  imports: [RouterLink],
})
export class Footer {
  // Dynamic copyright year
  // React: const currentYear = new Date().getFullYear();
  readonly currentYear = new Date().getFullYear();
  readonly ROUTES = ROUTES;
}

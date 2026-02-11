// ============================================================================
// FOOTER COMPONENT - Application footer with dynamic copyright year
// React equivalent: Functional component
// ============================================================================

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
})
export class Footer {
  // Dynamic copyright year
  // React: const currentYear = new Date().getFullYear();
  readonly currentYear = new Date().getFullYear();
}

import { Component, input, computed } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button.html',
})
export class Button {
  label = input<string>('');
  icon = input<string>('');
  variant = input<'primary' | 'secondary' | 'success' | 'danger'>('primary');
  disabled = input(false);
  loading = input(false);

  protected mappedSeverity = computed(() => {
    const map = {
      primary: 'primary',
      secondary: 'secondary',
      success: 'success',
      danger: 'danger',
    } as const;

    return map[this.variant()];
  });

  onClick(event: Event) {
    // bubble normallyso
  }
}

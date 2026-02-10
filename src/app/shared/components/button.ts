import { Component, computed, input } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-800 focus:ring-blue-900',
  secondary: 'bg-gray-500 text-white hover:bg-gray-800 focus:ring-gray-900',
  danger: 'bg-red-500 text-white hover:bg-red-800 focus:ring-red-900',
  warning: 'bg-yellow-500 text-white hover:bg-yellow-800 focus:ring-yellow-900',
  info: 'bg-blue-500 text-white hover:bg-blue-800 focus:ring-blue-900',
  success: 'bg-green-500 text-white hover:bg-green-800 focus:ring-green-900',
  icon: 'hover:bg-slate-100 text-slate-700 focus:ring-slate-200',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2 h-8 text-sm',
  md: 'px-4 h-10 text-base',
  lg: 'px-6 h-12 text-lg',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
};

@Component({
  selector: 'button[appButton],a[appButton]',
  template: `<ng-content />`,
  host: {
    '[class]': 'hostClasses()',
    '[attr.disabled]': 'disabled() || null',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);

  protected readonly hostClasses = computed(() => {
    const base =
      'inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantClass = variantClasses[this.variant()];
    const sizeClass =
      this.variant() === 'icon' ? iconSizeClasses[this.size()] : sizeClasses[this.size()];
    return `${base} ${variantClass} ${sizeClass}`;
  });
}

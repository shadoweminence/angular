import { Component, computed, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.html',
})
export class FormErrors {
  readonly control = input.required<FieldState<unknown>>();

  protected readonly shouldShowError = computed(() => {
    const field = this.control();
    return !field.valid() && field.touched();
  });
}

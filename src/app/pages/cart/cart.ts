import { Component, computed, inject, OnInit } from '@angular/core';
import { cartActions } from '@app/shared/store/cart/cartActions';
import { cartFeatures } from '@app/shared/store/cart/cartFeatures';
import { Store } from '@ngrx/store';
import { CommonModule, JsonPipe } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [DataViewModule, SkeletonModule, ButtonModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './cart.html',
})
export class Cart implements OnInit {
  private readonly store = inject(Store);

  private allCarts = this.store.selectSignal(cartFeatures.selectCart);
  carts = computed(() => this.allCarts()?.flatMap((cart) => cart.products) || []);

  isLoading = this.store.selectSignal(cartFeatures.selectIsLoading);

  ngOnInit(): void {
    this.store.dispatch(cartActions.getCarts());
  }

  counterArray(n: number): number[] {
    return Array(n);
  }
}

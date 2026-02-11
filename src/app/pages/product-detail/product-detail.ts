import { inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule, DataView } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { SelectItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { productActions } from '@app/shared/store/product/productActions';
import { productFeatures, selectProducts } from '@app/shared/store/product/productFeatures';

import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
    SelectButtonModule,
    SkeletonModule,
    FormsModule,
    ButtonModule,
  ],
  template: '<h1>Product Detail</h1>',
})
export class ProductDetail implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  isLoading = this.store.selectSignal(productFeatures.selectIsLoading);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(productActions.getProductById({ id }));
  }
  counterArray(n: number): number[] {
    return Array(n);
  }
}

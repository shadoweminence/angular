import { inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule, DataView } from 'primeng/dataview';
import { SelectButtonModule, SelectButton } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { SelectItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { productActions } from '../../shared/store/productActions';
import { productFeatures, selectProducts } from '../../shared/store/productFeatures';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-products',
  imports: [
    DataViewModule,
    CommonModule,
    SelectButtonModule,
    SkeletonModule,
    FormsModule,
    DataView,
    ButtonModule,
  ],
  templateUrl: './products.html',
})
export class Products implements OnInit {
  private store = inject(Store);
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  products = this.store.selectSignal(selectProducts);
  isLoading = this.store.selectSignal(productFeatures.selectIsLoading);

  options = ['list', 'grid'];

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];

    this.store.dispatch(productActions.loadProducts());
  }
  counterArray(n: number): number[] {
    return Array(n);
  }

  // getSeverity(product: Product) {
  //   switch (product.inventoryStatus) {
  //     case 'INSTOCK':
  //       return 'success';

  //     case 'LOWSTOCK':
  //       return 'warn';

  //     case 'OUTOFSTOCK':
  //       return 'danger';

  //     default:
  //       return null;
  //   }
  // }
}

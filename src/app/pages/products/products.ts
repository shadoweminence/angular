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
import { selectProducts } from '../../shared/store/productFeatures';

@Component({
  selector: 'app-products',
  imports: [
    DataViewModule,
    CommonModule,
    SelectButtonModule,
    SkeletonModule,
    FormsModule,
    NgClass,
    SelectButton,
    DataView,
  ],
  templateUrl: './products.html',
})
export class Products implements OnInit {
  private store = inject(Store);
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  products = signal<any>([]);
  layout: 'list' | 'grid' = 'grid';

  options = ['list', 'grid'];

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];

    this.store.dispatch(productActions.loadProducts());

    this.store.select(selectProducts).subscribe((products) => {
      this.products.set(products);
    });
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

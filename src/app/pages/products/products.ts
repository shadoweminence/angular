// ============================================================================
// PRODUCTS COMPONENT - Display and filter products from API
// React equivalent: Functional component with hooks (useState, useEffect, useSelector)
// ============================================================================

import { inject, OnInit, computed } from '@angular/core';
import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { productActions } from '@store/product/productActions';
import { productFeatures, selectProducts } from '@store/product/productFeatures';
import { ROUTES } from '@app/enums/router';
import { profileActions } from '@app/shared/store/profile/profileActions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [DataViewModule, SkeletonModule, ButtonModule, RouterLink],
  templateUrl: './products.html',
})
export class Products implements OnInit {
  private readonly store = inject(Store);
  readonly ROUTES = ROUTES;

  // Select all products from store
  // React: const allProducts = useSelector(selectProducts)
  private allProducts = this.store.selectSignal(selectProducts);

  // Select category filter from store
  // React: const categoryFilter = useSelector(state => state.product.categoryFilter)
  private categoryFilter = this.store.selectSignal(productFeatures.selectCategoryFilter);

  // Computed signal that filters products based on selected category
  // React: const products = useMemo(() => { ... }, [allProducts, categoryFilter])
  products = computed(() => {
    const products = this.allProducts();
    const filter = this.categoryFilter();

    // Return all products if no filter is applied
    if (!filter || !products) return products || [];

    // Filter products by category
    const filtered = products.filter((product: any) => {
      const category = product.category || '';

      // Map filter values to API category names
      if (filter === 'male') {
        return category === "men's clothing";
      } else if (filter === 'female') {
        return category === "women's clothing";
      } else if (filter === 'jewelery') {
        return category === 'jewelery';
      } else if (filter === 'electronics') {
        return category === 'electronics';
      }
      return true;
    });

    return filtered;
  });

  // Loading state from store
  // React: const isLoading = useSelector(state => state.product.isLoading)
  isLoading = this.store.selectSignal(productFeatures.selectIsLoading);

  // Load products on component initialization
  // React: useEffect(() => { dispatch(loadProducts()) }, [])
  ngOnInit(): void {
    this.store.dispatch(productActions.loadProducts());
    this.store.dispatch(profileActions.getProfile({ id: 1 }));
  }

  // Helper function to create array for skeleton loaders
  // React: const counterArray = (n) => Array(n).fill(0)
  counterArray(n: number): number[] {
    return Array(n);
  }
}

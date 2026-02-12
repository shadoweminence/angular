// ============================================================================
// PRODUCT DETAIL COMPONENT - Display single product details
// React equivalent: Functional component with useParams hook
// ============================================================================

import { inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProducts, productFeatures } from '@store/product/productFeatures';
import { productActions } from '@store/product/productActions';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ROUTES } from '@app/enums/router';
import { cartActions } from '@app/shared/store/cart/cartActions';

@Component({
  selector: 'app-product-detail',
  imports: [ButtonModule, RouterLink, SkeletonModule],
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  readonly ROUTES = ROUTES;

  // Get all products from store
  private allProducts = this.store.selectSignal(selectProducts);

  // Get single product from store
  private singleProduct = this.store.selectSignal(productFeatures.selectProduct);

  // Loading state
  isLoading = this.store.selectSignal(productFeatures.selectIsLoading);

  // Find product by ID from route params or use single product from store
  product = () => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // First try to find in products list, otherwise use single product
    return this.allProducts()?.find((p) => p.id === id) || this.singleProduct();
  };

  ngOnInit(): void {
    if (!this.allProducts()) {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        const id = Number(idParam);
        this.store.dispatch(productActions.getProductById({ id }));
      }
    }
  }

  addToCart() {
    const product = this.product();
    const request = {
      id: 1,
      userId: 1,
      products: [
        {
          productId: product?.id!,
          quantity: 1,
        },
      ],
    };
    if (product) {
      this.store.dispatch(cartActions.addCart({ request }));
    }
  }
}

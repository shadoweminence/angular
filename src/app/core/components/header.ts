// ============================================================================
// HEADER COMPONENT - Navigation bar with product filters and user menu
// React equivalent: Functional component with hooks
// ============================================================================

import { Component, inject, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { Store } from '@ngrx/store';
import { authActions } from '@store/auth/auth-actions';
import { productActions } from '@store/product/productActions';
import { PRODUCTS_MENU_ITEMS, USER_MENU_ITEMS } from '../constants/menu.constants';

@Component({
  selector: 'app-header',
  imports: [AvatarModule, BadgeModule, MenubarModule, MenuModule],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  private readonly store = inject(Store);

  items: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];
  isMenuOpen = false;
  selectedCategory: 'male' | 'female' | 'jewelery' | 'electronics' | null = null;

  ngOnInit(): void {
    // Initialize menu items
    this.items = PRODUCTS_MENU_ITEMS;
    this.userMenuItems = USER_MENU_ITEMS(() => this.handleLogout());
  }

  // Handle category filter selection (toggle on/off)
  // React: const handleCategorySelect = (category) => { ... }
  onCategorySelect(category: 'male' | 'female' | 'jewelery' | 'electronics'): void {
    this.selectedCategory = this.selectedCategory === category ? null : category;
    this.store.dispatch(productActions.setCategoryFilter({ category: this.selectedCategory }));
  }

  // Handle user logout
  // React: const handleLogout = () => { dispatch(logout()) }
  private handleLogout(): void {
    this.store.dispatch(authActions.logout());
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { Store } from '@ngrx/store';
import { authActions } from '@store/auth-actions';
import { PRODUCTS_MENU_ITEMS, USER_MENU_ITEMS } from '../constants/menu.constants';

@Component({
  selector: 'app-header',
  imports: [AvatarModule, BadgeModule, MenubarModule, InputTextModule, RippleModule, MenuModule],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  private readonly store = inject(Store);

  items: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];
  isMenuOpen = false;

  ngOnInit(): void {
    this.items = PRODUCTS_MENU_ITEMS;
    this.userMenuItems = USER_MENU_ITEMS(() => this.handleLogout());
  }

  private handleLogout(): void {
    this.store.dispatch(authActions.logout());
  }
}

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

@Component({
  selector: 'app-header',
  imports: [AvatarModule, BadgeModule, MenubarModule, InputTextModule, RippleModule, MenuModule],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  private store = inject(Store);
  items: MenuItem[] | undefined;
  userMenuItems: MenuItem[] | undefined;
  isMenuOpen = false;

  ngOnInit() {
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
      },
    ];

    this.userMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
      },
      {
        separator: true,
      },
      {
        label: 'Log Out',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.onLogout(),
      },
    ];
  }

  onLogout() {
    this.store.dispatch(authActions.logout());
  }
}

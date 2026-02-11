import { MenuItem } from 'primeng/api';

export const PRODUCTS_MENU_ITEMS: MenuItem[] = [
  {
    label: 'New',
    icon: 'pi pi-fw pi-plus',
  },
  {
    label: 'Edit',
    icon: 'pi pi-fw pi-pencil',
  },
];

export const USER_MENU_ITEMS = (onLogout: () => void): MenuItem[] => [
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
    command: onLogout,
  },
];

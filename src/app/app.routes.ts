import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./layouts/auth-layout/auth-routing.module').then((m) => m.routes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layouts/dashboard-layout/dashboard-routing.module').then(
        (m) => m.routes
      ),
  },
];

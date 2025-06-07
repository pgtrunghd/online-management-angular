import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./layouts/auth-layout/auth-routing.module').then((m) => m.routes),
    canActivate: [guestGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./layouts/dashboard-layout/dashboard-routing.module').then(
        (m) => m.routes
      ),
    canActivate: [authGuard],
  },
];

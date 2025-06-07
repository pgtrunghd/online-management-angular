import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = authService.getAuthToken();
  const user = authService.getMe();

  if (!token || !user) {
    router.navigate(['auth/login']);
    return false;
  } 

  return true;
};

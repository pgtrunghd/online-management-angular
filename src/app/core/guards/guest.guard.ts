import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = authService.getAuthToken();
  const user = authService.getMe();

  if (token && user) { 
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};

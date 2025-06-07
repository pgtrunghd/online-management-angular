import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.responseType === 'text') return next(req);
  const authToken = inject(AuthService).getAuthToken();
  let newReq: HttpRequest<any>;

  if (req.url.includes('auth')) {
    newReq = req;
  } else {
    newReq = req.clone({
      headers: req.headers.append(
        'Authorization',
        `Bearer ${authToken.accessToken}`
      ),
    });
  }

  return next(newReq);
};

import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggingInterceptor implements HttpInterceptor {
  messageService = inject(MessageService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMessage = 'Đã xảy ra lỗi';

        if (err.error instanceof ErrorEvent) {
          errorMessage = `Lỗi: ${err.error.error}`;
        }
        console.log(errorMessage);

        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: errorMessage,
        });

        return throwError(() => err);
      })
    );
  }
}

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../auth/auth.store';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);

  return next(req).pipe({
    error: (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          store.logout();
        }
        if (err.status === 403) {
          alert('Sizin bu əməliyyata icazəniz yoxdur!');
        }
        if (err.status >= 500) {
          console.error('Server Error:', err.message);
        }
      }
      throw err;
    }
  } as any);
};
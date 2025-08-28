import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../auth/auth.store';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Custom messages based on status
        if (err.status === 0) {
          toastr.error('Server is unreachable. Please try again later.');
        } else if (err.status === 401) {
          toastr.warning(err.error?.message);
        } else if (err.status === 403) {
          toastr.error('You do not have permission for this action.');
        } else if (err.status >= 500) {
          toastr.error('Server error: ' + err.message);
        } else {
          const message = err.error?.message || 'Unexpected error occurred';
          toastr.error(message, `Error ${err.status}`);
        }
      }

      return throwError(() => err);
    })
  );
};
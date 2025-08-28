import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../auth/auth.store';
import { environment } from '../../environments/environment';
import { SKIP_AUTH } from '../http/skip-auth.context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  const store = inject(AuthStore);
  const token = store.session().accessToken;

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
    url: req.url.startsWith('http')
      ? req.url
      : `${environment.apiUrl}${req.url}`,
  });

  return next(authReq);
};

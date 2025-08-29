import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';
import { Role } from '../auth/auth.types';

export const AdminGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const session = authStore.session();
  
  console.log(session)
  
  const user = session.user;

  if (user && user.role == Role.Admin) {
    return true;
  }

  router.navigate(['/auth/login']); 
  return false;
};
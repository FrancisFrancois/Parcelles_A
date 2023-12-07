import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './features/auth/services/auth.service';


export const accessSimpleGuard: CanActivateFn = (route, state) => {
  // désactive les guard en dev si la ligne suivante est laissé
  // TODO A retirer dans la version definitve
  if(!environment.production) return true;

  const authService: AuthService = inject(AuthService);

  const router: Router = inject(Router);

  if(!authService.isUserConnected()) {
    router.navigateByUrl('auth');
    return false
  }

  return true;
};
export const accessSecretaryGuard: CanActivateFn = (route, state) => {
  // désactive les guard en dev si la ligne suivante est laissé
  // TODO A retirer dans la version definitve
  if(!environment.production) return true;

  const authService: AuthService = inject(AuthService);

  const router: Router = inject(Router);

  if(!authService.isUserConnected()) {
    router.navigateByUrl('auth');
    return false
  }

  if(!authService.hasSecretaryRight()){
    router.navigateByUrl('dashboard');
    return false;
  }

  return true;
};

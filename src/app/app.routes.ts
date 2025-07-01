import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/login/login.routes').then((m) => m.LOGIN_ROUTES)
  },
  {
    path: 'catering',
    loadChildren: () => import('./features/catering/catering.routes').then((m) => m.CATERING_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

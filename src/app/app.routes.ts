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
    path: 'user',
    loadChildren: () => import('./features/auth/user/create-user.routes').then((m) => m.USERS_ROUTES)
  },
  {
    path: 'catering',
    loadChildren: () => import('./features/catering/catering.routes').then((m) => m.CATERING_ROUTES)
  },
  {
    path: 'nutritional-plan',
    loadChildren: () => import('./features/nutritional-plan/nutritional-plan.routes').then((m) => m.NUTRITIONAL_PLANS_ROUTES)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./features/appointment/appointment.routes').then((m) => m.APPOINTMENT_ROUTES)
  },
  {
    path: 'payments',
    loadChildren: () => import('./features/payments/payments.routes').then((m) => m.PAYMENTS_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

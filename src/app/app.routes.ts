import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'catering',
    loadChildren: () => import('./features/catering/catering.routes').then((m) => m.CATERING_ROUTES)
  }
];

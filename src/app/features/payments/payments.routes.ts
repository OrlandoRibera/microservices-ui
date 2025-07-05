import { Routes } from '@angular/router';
import { Payments } from './payments';
import { PaymentsList } from './components/payments-list/payments-list';
import { PaymentCreate } from './components/payment-create/payment-create';

export const PAYMENTS_ROUTES: Routes = [
  {
    path: '',
    component: Payments,
    children: [
      {
        path: 'create',
        component: PaymentCreate
      },
      {
        path: 'list',
        component: PaymentsList
      },
      {
        path: '**',
        redirectTo: 'create',
        pathMatch: 'full'
      }
    ]
  }
];

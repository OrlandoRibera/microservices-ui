import { Routes } from '@angular/router';
import { CreateUserComponent } from './create-user';

export const USERS_ROUTES: Routes = [
  {
    path: 'create',
    component: CreateUserComponent
  }
];
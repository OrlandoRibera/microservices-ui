import { Routes } from '@angular/router';
import { CreateUserComponent } from './create-user';
import { AddAddresComponent } from '../update-addres/add-addres';
import { ListAddress } from '../update-addres/list-address/list-address';

export const USERS_ROUTES: Routes = [
  {
    path: 'create',
    component: CreateUserComponent
  },
  {
    path: 'address-create',
    component: AddAddresComponent
  },
  {
    path: 'address-list',
    component: ListAddress
  }
];

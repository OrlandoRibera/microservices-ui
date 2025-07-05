import { Routes } from '@angular/router';
import { CreateUserComponent } from './create-user';
import { AddAddresComponent } from '../update-addres/add-addres';
import { ListAddress } from '../update-addres/list-address/list-address';
import { UpdateBlockAddress } from '../update-addres/update-block-address/update-block-address';

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
  },
  {
    path: 'update-block-address',
    component: UpdateBlockAddress
  },
  {
    path: '**',
    redirectTo: 'create',
    pathMatch: 'full'
  }
];

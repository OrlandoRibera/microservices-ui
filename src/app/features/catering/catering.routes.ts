import { Routes } from '@angular/router';
import { Catering } from './catering';

export const CATERING_ROUTES: Routes = [
  {
    path: '',
    component: Catering,
    children: []
  }
];

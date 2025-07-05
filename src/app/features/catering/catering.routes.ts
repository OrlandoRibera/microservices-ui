import { Routes } from '@angular/router';
import { Catering } from './catering';
import { FoodPackagesList } from './components/food-packages-list/food-packages-list';

export const CATERING_ROUTES: Routes = [
  {
    path: '',
    component: Catering,
    children: [
      {
        path: 'food-packages',
        component: FoodPackagesList
      },
      {
        path: '**',
        redirectTo: 'food-packages',
        pathMatch: 'full'
      }
    ]
  }
];

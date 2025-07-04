import { Routes } from '@angular/router';
import { Catering } from './catering';
import { FoodPackagesList } from './components/food-packages-list/food-packages-list';
import { NextRecipesComponent } from './components/next-recipes/next-recipes';

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
        path: 'next-recipes',
        component: NextRecipesComponent
      },
      {
        path: '**',
        redirectTo: 'food-packages',
        pathMatch: 'full'
      }
    ]
  }
];

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { FoodPackage } from '../interfaces/food-package.interface';

@Injectable({
  providedIn: 'root'
})
export class GetFoodPackagesServices {
  private readonly _HTTP = inject(HttpClient);

  public getFoodPackages(): Observable<FoodPackage[]> {
    return this._HTTP.get<FoodPackage[]>(`/${ROUTES.CATERING}/getAllPackages`);
  }
}

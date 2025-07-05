import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodPackage } from '../interfaces/food-package.interface';
import { ROUTES } from '../../../shared/constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class CreateFoodPackage {
  private readonly _HTTP = inject(HttpClient);

  public create(recipeId: string, clientId: string): Observable<FoodPackage> {
    return this._HTTP.post<FoodPackage>(`/${ROUTES.CATERING}/catering/createPackage`, {
      recipeId,
      clientId
    });
  }
}

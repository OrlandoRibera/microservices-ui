import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FoodPackage } from '../interfaces/food-package.interface';
import { Observable } from 'rxjs';
import { ROUTES } from '../../../shared/constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class PackFoodPackage {
  private readonly _HTTP = inject(HttpClient);

  public pack(id: string): Observable<FoodPackage> {
    return this._HTTP.post<FoodPackage>(`/${ROUTES.CATERING}/catering/packFoodPackage`, { id });
  }
}

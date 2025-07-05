import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../interfaces/food.interface';
import { ROUTES } from '../../../shared/constants/routes.constants';

export interface CreateFoodRequest {
  name: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  kcal: number;
  foodPackageId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateFoodInPackageService {
  private readonly _HTTP = inject(HttpClient);

  public createFood(request: CreateFoodRequest): Observable<Food> {
    return this._HTTP.post<Food>(`/${ROUTES.CATERING}/catering/createFoodInPackage`, request);
  }
}

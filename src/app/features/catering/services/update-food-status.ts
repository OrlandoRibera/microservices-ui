import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { Food } from '../interfaces/food.interface';

@Injectable({
  providedIn: 'root'
})
export class UpdateFoodStatus {
  private readonly _HTTP = inject(HttpClient);

  public updateFoodStatus(foodId: string, newStatus: string): Observable<Food> {
    return this._HTTP.post<Food>(`/${ROUTES.CATERING}/catering/updateFoodStatus`, {
      foodId,
      newStatus
    });
  }
}

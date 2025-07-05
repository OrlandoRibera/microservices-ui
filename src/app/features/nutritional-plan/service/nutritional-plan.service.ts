import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NutritionalPlanResponse } from '../dto/nutritional-plan-response';
import { CreateNutritionalPlanRequest } from '../dto/create-nutritional-plan-request';

@Injectable({
  providedIn: 'root'
})
export class NutritionalPlanService {
  private readonly _BASE_URL = '/nutritional/api/nutritionalPlan';
  private _http = inject(HttpClient);

  public getPlansByNutritionistId(nutritionistId: string): Observable<NutritionalPlanResponse[]> {
    return this._http.get<NutritionalPlanResponse[]>(`${this._BASE_URL}/nutritionist/${nutritionistId}`);
  }

  public createPlan(plan: CreateNutritionalPlanRequest): Observable<NutritionalPlanResponse> {
    return this._http.post<NutritionalPlanResponse>(`${this._BASE_URL}/create`, plan);
  }
}

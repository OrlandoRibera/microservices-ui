import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NutritionalPlanResponse } from '../dto/nutritional-plan-response';

@Injectable({
  providedIn: 'root'
})
export class NutritionalPlanService {
  private readonly _BASE_URL = '/nutritional/api/nutritionalPlan/client';
  private _http = inject(HttpClient);

  public getPlansByClientId(clientId: string): Observable<NutritionalPlanResponse[]> {
    return this._http.get<NutritionalPlanResponse[]>(`${this._BASE_URL}/${clientId}`);
  }
}
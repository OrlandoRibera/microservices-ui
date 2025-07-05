import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentResponse } from '../dto/appointment-response';
import { CreateAppointmentRequest } from '../dto/create-appointment-request';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly _BASE_URL = '/nutritional/api/appointment';
  private _http = inject(HttpClient);

  public getAppointmentsByNutritionistId(nutritionistId: string): Observable<AppointmentResponse[]> {
    return this._http.get<AppointmentResponse[]>(`${this._BASE_URL}/nutritionist/${nutritionistId}`);
  }

  public createAppointment(appointment: CreateAppointmentRequest): Observable<AppointmentResponse> {
    return this._http.post<AppointmentResponse>(`${this._BASE_URL}/create`, appointment);
  }
}

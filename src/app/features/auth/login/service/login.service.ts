import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LoginRequest } from '../dto/login-request';
import { LoginResponse } from '../dto/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly _API_URL = '/nutritional/api/user/login';
  private _http = inject(HttpClient);

  public login(payload: LoginRequest): Promise<LoginResponse> {
    return firstValueFrom(this._http.post<LoginResponse>(this._API_URL, payload));
  }
}

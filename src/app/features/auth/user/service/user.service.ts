import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CreateUserRequest } from '../dto/create-user-request';
import { CreateUserResponse } from '../dto/create-user-response';
import { UserResponse } from '../../../shared/dto/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _API_URL = '/nutritional/api/user';
  private _http = inject(HttpClient);

  public createUser(payload: CreateUserRequest): Promise<CreateUserResponse> {
    return firstValueFrom(this._http.post<CreateUserResponse>(this._API_URL + "/create", payload));
  }

  public getUsers(): Promise<UserResponse[]> {
    return firstValueFrom(this._http.get<UserResponse[]>(this._API_URL + "/getUsers", {}));
  }
}

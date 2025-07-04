import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AddAddressRequest } from '../dto/add-addres-request';
import { UserAddressByIDResponse } from '../dto/response-list-addres';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private readonly _API_URL = '/cordination/';
  private _http = inject(HttpClient);

  public addAddress(payload: AddAddressRequest): Promise<boolean> {
    return firstValueFrom(this._http.post<boolean>(this._API_URL + 'api/client/address', payload));
  }

  public listAddress(idUser: string): Promise<UserAddressByIDResponse> {
    return firstValueFrom(this._http.get<UserAddressByIDResponse>(this._API_URL + 'api/client/' + idUser));
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { PaymentUsers } from '../interfaces/payment-users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _HTTP = inject(HttpClient);

  public getAllUsers(): Observable<PaymentUsers[]> {
    return this._HTTP.get<PaymentUsers[]>(`${ROUTES.MARCO}/catering/customers`);
  }
}

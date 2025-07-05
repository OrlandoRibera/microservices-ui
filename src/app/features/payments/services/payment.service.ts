import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { PaymentContract } from '../interfaces/payment-contract.interface';
import { PaymentMethod } from '../interfaces/payment-method.interface';
import { PaymentOrder } from '../interfaces/payment-order.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly _HTTP = inject(HttpClient);

  public getAllPaymentMethods(): Observable<PaymentMethod[]> {
    return this._HTTP.get<PaymentMethod[]>(`${ROUTES.MARCO}/catering/paymentMethods`);
  }

  public getContractCustomerId(customerId: string): Observable<PaymentContract[]> {
    return this._HTTP.get<PaymentContract[]>(`${ROUTES.MARCO}/catering/customer/${customerId}/contracts`);
  }

  public getOrders(): Observable<PaymentOrder[]> {
    return this._HTTP.get<PaymentOrder[]>(`${ROUTES.MARCO}/catering/orders`);
  }

  public payContract(
    paymentMethodId: string,
    price: number,
    currency: string,
    orderId: string,
    customerId: string,
    contractId: string,
    socialReason: string,
    nit: string,
    email: string
  ): Observable<unknown> {
    return this._HTTP.post<unknown>(`${ROUTES.MARCO}/catering/payment`, {
      paymentMethod: {
        id: paymentMethodId
      },
      price: {
        amount: price,
        currency: currency
      },
      order: {
        id: orderId
      },
      billingInvoice: {
        customerId: customerId,
        contract: contractId,
        billerData: {
          socialReason: socialReason,
          nit: nit,
          email: email
        }
      }
    });
  }

  public getAllPayments(): Observable<unknown> {
    return this._HTTP.get<unknown>(`${ROUTES.MARCO}/catering/payments`);
  }
}

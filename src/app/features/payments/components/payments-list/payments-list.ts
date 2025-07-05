import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-payments-list',
  imports: [JsonPipe],
  templateUrl: './payments-list.html',
  styleUrl: './payments-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsList implements AfterViewInit {
  private readonly _PAYMENT_SERVICE = inject(PaymentService);

  public payments: unknown;

  public ngAfterViewInit(): void {
    this._PAYMENT_SERVICE.getAllPayments().subscribe({
      next: (response) => {
        this.payments = response;
        console.log('🎯 ~ PaymentsList ~ this._PAYMENT_SERVICE.getAllPayments ~ response:', response);
      }
    });
  }
}

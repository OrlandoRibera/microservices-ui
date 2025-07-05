import { SlicePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { PaymentContract } from '../../interfaces/payment-contract.interface';
import { PaymentMethod } from '../../interfaces/payment-method.interface';
import { PaymentOrder } from '../../interfaces/payment-order.interface';
import { PaymentUsers } from '../../interfaces/payment-users.interface';
import { PaymentService } from '../../services/payment.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-payment-create',
  imports: [ReactiveFormsModule, SlicePipe],
  templateUrl: './payment-create.html',
  styleUrl: './payment-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentCreate implements AfterViewInit {
  private readonly _CHANGE_DETECTOR_REF = inject(ChangeDetectorRef);
  private readonly _USERS_SERVICE = inject(UsersService);
  private readonly _PAYMENT_SERVICE = inject(PaymentService);
  private readonly _FORM_BUILDER = inject(FormBuilder);
  private readonly _ROUTER = inject(Router);

  public form: FormGroup;
  public users: PaymentUsers[] = [];
  public contracts: PaymentContract[] = [];
  public orders: PaymentOrder[] = [];
  public paymentMethods: PaymentMethod[] = [];

  constructor() {
    this.form = this._FORM_BUILDER.group({
      user: [null, Validators.required],
      contract: [null, Validators.required],
      order: [null, Validators.required],
      paymentMethod: [null, Validators.required],
      priceAmount: [null, [Validators.required, Validators.min(0.01)]],
      socialReason: ['', Validators.required],
      nit: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // When user changes, load contracts
    this.form
      .get('user')!
      .valueChanges.pipe(
        tap(() => {
          this.contracts = [];
          this.form.get('contract')!.reset();
          this.orders = [];
          this.form.get('order')!.reset();
        }),
        switchMap((userId: string) => this._PAYMENT_SERVICE.getContractCustomerId(userId))
      )
      .subscribe((contracts) => {
        this.contracts = contracts;
      });

    // When contract changes, load orders
    this.form
      .get('contract')!
      .valueChanges.pipe(
        tap(() => {
          this.orders = [];
          this.form.get('order')!.reset();
        }),
        switchMap((contractId: string) =>
          this._PAYMENT_SERVICE.getOrders().pipe(map((orders) => orders.filter((order) => order.contract.id === contractId)))
        )
      )
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  public ngAfterViewInit(): void {
    this._USERS_SERVICE.getAllUsers().subscribe({
      next: (users: PaymentUsers[]) => {
        this.users = users;
        this._CHANGE_DETECTOR_REF.markForCheck();
      }
    });
    this._PAYMENT_SERVICE.getAllPaymentMethods().subscribe({
      next: (methods: PaymentMethod[]) => {
        // If the API returns an array, use it directly. If it returns an object, convert to array.
        this.paymentMethods = Array.isArray(methods) ? methods : Object.values(methods);
        this._CHANGE_DETECTOR_REF.markForCheck();
      }
    });
  }

  public submit(): void {
    if (this.form.valid) {
      console.log('Form value:', this.form.value.user);
      // Implement submission logic here
      const customerId = this.form.value.user;
      const contractId = this.form.value.contact;
      const orderId = this.form.value.order;
      const paymentMethodId = this.form.value.paymentMethod;
      const priceAmount = this.form.value.priceAmount;
      const socialReason = this.form.value.SocialReason;
      const nit = this.form.value.nit;
      const email = this.form.value.email;

      this._PAYMENT_SERVICE
        .payContract(paymentMethodId, priceAmount, '', orderId, customerId, contractId, socialReason, nit, email)
        .subscribe({
          next: () => {
            alert('Successfully created!');
            this._ROUTER.navigate(['/payments/list']);
          }
        });
    }
  }
}

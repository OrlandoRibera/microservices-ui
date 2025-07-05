import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from './service/addres.service';
import { AddAddressRequest } from './dto/add-addres-request';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-add-addres',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-addres.html',
  styleUrls: ['./add-addres.scss']
})
export class AddAddresComponent implements OnInit {
  public addresForm: FormGroup;
  public isSubmitting = false;
  public error: string | null = null;
  public clientId: string | null = null;

  private _fb = inject(FormBuilder);
  private _addresService = inject(AddressService);
  private _router = inject(Router);

  private _authService = inject(AuthService);

  public ngOnInit(): void {
    this.loadUser();
  }

  public loadUser(): void {
    this.clientId = this._authService.getUserId();
    if (!this.clientId) {
      this.error = 'User ID is missing';
      return;
    }
  }

  constructor() {
    this.addresForm = this._fb.group({
      street: ['', Validators.required],
      city: ['', [Validators.required]],
      latituded: ['', Validators.required],
      longitud: ['', Validators.required],
      dateDelivery: ['', Validators.required]
    });
  }

  public submit() {
    if (this.addresForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const newAddress: AddAddressRequest = this.addresForm.value as AddAddressRequest;
    newAddress.IdClient = this.clientId!;
    this._addresService
      .addAddress(newAddress)
      .then((addAddress) => {
        console.log('Addres created:', addAddress);
        alert('Addres created successfully');
        this._router.navigate(['/user/address-list']);
      })
      .catch((err) => {
        console.error(err);
        this.error = 'Failed to create user';
        this.isSubmitting = false;
      });
  }

  public goToLogin() {
    this._router.navigateByUrl('/login');
  }
}

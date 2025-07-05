import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../service/addres.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateBlockAddressRequest } from '../dto/update-block-addres-request';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-block-address',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './update-block-address.html',
  styleUrl: './update-block-address.css'
})
export class UpdateBlockAddress implements OnInit {
  public addressBlockForm: FormGroup;
  public isSubmitting = false;
  public error: string | null = null;
  public clientId: string | null = null;
  public addressId: string | null = null;

  private _fb = inject(FormBuilder);
  private _addresService = inject(AddressService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  private _authService = inject(AuthService);

  public ngOnInit(): void {
    this.loadUser();
    this.loadAddressData();
  }

  public loadUser(): void {
    this.clientId = this._authService.getUserId();
    if (!this.clientId) {
      this.error = 'User ID is missing';
      return;
    }
  }

  public loadAddressData(): void {
    this._route.queryParams.subscribe((params) => {
      this.addressId = params['addressId'];
      console.log('Address ID received:', this.addressId);
    });
  }

  constructor() {
    this.addressBlockForm = this._fb.group({
      toDate: ['', Validators.required],
      fromDate: ['', [Validators.required]]
    });
  }

  public submit() {
    if (this.addressBlockForm.invalid || !this.addressId) {
      return;
    }

    this.isSubmitting = true;
    const updateBlockAddress: UpdateBlockAddressRequest = this.addressBlockForm.value as UpdateBlockAddressRequest;
    updateBlockAddress.idClient = this.clientId!;
    updateBlockAddress.addresGuid = this.addressId;

    this._addresService
      .updateBlockAddres(updateBlockAddress)
      .then((updateBlockAddress) => {
        console.log('Update block address:', updateBlockAddress);
        alert('Dirección actualizada exitosamente');
        this._router.navigate(['/user/address-list']);
      })
      .catch((err) => {
        console.error(err);
        this.error = 'Error al actualizar la dirección';
        this.isSubmitting = false;
      });
  }

  public goToLogin() {
    this._router.navigateByUrl('/login');
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { AddressService } from '../service/addres.service';
import { Router } from '@angular/router';
import { UserAddressByIDResponse } from '../dto/response-list-addres';
import { AuthService } from '../../../../core/services/auth.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list-address',
  imports: [NgIf, NgFor],
  templateUrl: './list-address.html',
  styleUrl: './list-address.css'
})
export class ListAddress implements OnInit {
  public clientId: string | null = null;
  public error: string | null = null;
  public userAddress: UserAddressByIDResponse | null = null;

  private _addresService = inject(AddressService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  public ngOnInit(): void {
    this.loadUser();
  }

  public loadUser(): void {
    this.clientId = this._authService.getUserId();
    if (!this.clientId) {
      this.error = 'User ID is missing';
      return;
    } else {
      this._addresService.listAddress(this.clientId).then((response) => {
        this.userAddress = response;
      });
    }
  }

  public addNewAddress() {
    this._router.navigateByUrl('/user/address-create');
  }
}

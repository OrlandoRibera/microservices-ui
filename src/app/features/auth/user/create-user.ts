import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';
import { CreateUserRequest } from './dto/create-user-request';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.scss']
})
export class CreateUserComponent {
  public createUserForm: FormGroup;
  public isSubmitting = false;
  public error: string | null = null;

  private _fb = inject(FormBuilder);
  private _userService = inject(UserService);
  private _router = inject(Router);

  constructor() {
    this.createUserForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  public submit() {
    if (this.createUserForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const newUser: CreateUserRequest = this.createUserForm.value as CreateUserRequest;

    this._userService
      .createUser(newUser)
      .then((createdUser) => {
        console.log('User created:', createdUser);
        alert('User created successfully');
        this._router.navigate(['/login']);
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

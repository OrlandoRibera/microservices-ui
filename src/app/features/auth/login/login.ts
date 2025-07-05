import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from './dto/login-response';
import { ROLES } from '../../../shared/constants/roles.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;

  private _fb = inject(FormBuilder);
  private _loginService = inject(LoginService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  constructor() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const result: LoginResponse = await this._loginService.login(this.loginForm.value);
        console.log('Login success', result);
        this._authService.setAuthData(result);

        this._redirectAfterLogin(result.role);
      } catch (error) {
        console.error('Login failed', error);
        alert('Invalid credentials');
      }
    }
  }

  public goToCreateUser() {
    this._router.navigateByUrl('/user/create');
  }

  private _redirectAfterLogin(role: string) {
    if (role === ROLES.NUTRITIONIST) {
      this._router.navigate(['/nutritional-plan']);
    } else if (role === ROLES.COOK) {
      this._router.navigate(['/catering']);
    } else if (role === ROLES.MANAGER) {
      this._router.navigate(['/payments']);
    } else {
      this._router.navigate(['/login']);
    }
  }
}

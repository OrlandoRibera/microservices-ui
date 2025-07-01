import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

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
        const result = await this._loginService.login(this.loginForm.value);
        console.log('Login success', result);
        this._authService.setAuthData(result);
        this._router.navigate(['/catering']);
      } catch (error) {
        console.error('Login failed', error);
        alert('Invalid credentials');
      }
    }
  }
}

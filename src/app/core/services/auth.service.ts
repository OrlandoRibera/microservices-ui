import { Injectable } from '@angular/core';
import { LoginResponse } from '../../features/auth/login/dto/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _TOKEN_KEY = 'auth_token';
  private readonly _TOKEN_EXP_KEY = 'auth_token_expires';
  private readonly _USER_ID = 'user_id';
  private readonly _USER_ROLE = 'user_role';

  public setAuthData(data: LoginResponse) {
    const expiresAt = Date.now() + data.expiresIn * 1000;
    localStorage.setItem(this._TOKEN_KEY, data.token);
    localStorage.setItem(this._TOKEN_EXP_KEY, expiresAt.toString());
    localStorage.setItem(this._USER_ID, data.userId);
    localStorage.setItem(this._USER_ROLE, data.role);
  }

  public getToken(): string | null {
    return localStorage.getItem(this._TOKEN_KEY);
  }

  public getUserRole(): string | null {
    return localStorage.getItem(this._USER_ROLE);
  }

  public getUserId(): string | null {
    return localStorage.getItem(this._USER_ID);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    const expires = localStorage.getItem(this._TOKEN_EXP_KEY);
    if (!token || !expires) return false;
    return Date.now() < parseInt(expires, 10);
  }

  public clear() {
    localStorage.removeItem(this._TOKEN_KEY);
    localStorage.removeItem(this._TOKEN_EXP_KEY);
  }
}

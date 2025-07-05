import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ROLES } from '../../shared/constants/roles.constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  public role: string | null;
  public readonly CLIENT_ROLE = ROLES.CLIENT;
  public readonly NUTRITIONIST_ROLE = ROLES.NUTRITIONIST;
  public readonly COOK_ROLE = ROLES.COOK;
  public readonly DELIVERY_ROLE = ROLES.DELIVERY;
  public readonly MANAGER_ROLE = ROLES.MANAGER;

  private _authService = inject(AuthService);

  constructor() {
    this.role = this._authService.getUserRole();
  }
}

import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Navbar } from './layout/navbar/navbar';
import { AppInsightsService } from './core/services/aplication-insigths-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'microservices-ui';
  private _router = inject(Router);
  private _insigths = inject(AppInsightsService);

  public get showNavbar() {
    return !this._router.url.startsWith('/login') && !this._router.url.startsWith('/user/create');
  }
}

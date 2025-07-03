import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NutritionalPlanService } from './service/nutritional-plan.service';
import { AuthService } from '../../core/services/auth.service';
import { NutritionalPlanResponse } from './dto/nutritional-plan-response';

@Component({
  selector: 'app-nutritional-plan',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nutritional-plan.html',
  styleUrls: ['./nutritional-plan.scss']
})
export class NutritionalPlanComponent implements OnInit {
  public plans: NutritionalPlanResponse[] = [];
  public isLoading = false;
  public error: string | null = null;

  private _nutritionalPlanService = inject(NutritionalPlanService);
  private _authService = inject(AuthService);

  public ngOnInit(): void {
    this.loadPlans();
  }

  public loadPlans(): void {
    const clientId = this._authService.getUserId();
    if (!clientId) {
      this.error = 'User ID is missing';
      return;
    }

    this.isLoading = true;
    this._nutritionalPlanService.getPlansByClientId(clientId).subscribe({
      next: (data) => {
        this.plans = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load plans';
        this.isLoading = false;
      }
    });
  }
}

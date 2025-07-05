import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NutritionalPlanService } from './service/nutritional-plan.service';
import { AuthService } from '../../core/services/auth.service';
import { NutritionalPlanResponse } from './dto/nutritional-plan-response';
import { CreateNutritionalPlanComponent } from './components/create-nutritional-plan';

@Component({
  selector: 'app-nutritional-plan',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CreateNutritionalPlanComponent],
  templateUrl: './nutritional-plan.html',
  styleUrls: ['./nutritional-plan.scss']
})
export class NutritionalPlanComponent implements OnInit {
  public plans: NutritionalPlanResponse[] = [];
  public isLoading = false;
  public isCreatingPlan = false;
  public error: string | null = null;

  private _nutritionalPlanService = inject(NutritionalPlanService);
  private _authService = inject(AuthService);

  public ngOnInit(): void {
    this.loadPlans();
  }

  public loadPlans(): void {
    const nutritionistId = this._authService.getUserId();
    if (!nutritionistId) {
      this.error = 'User ID is missing';
      return;
    }

    this.isLoading = true;
    this._nutritionalPlanService.getPlansByNutritionistId(nutritionistId).subscribe({
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

  public createPlan(): void {
    this.isCreatingPlan = true;
  }

  public handleModalClose(refresh: boolean): void {
    this.isCreatingPlan = false;
    if (refresh) {
      this.loadPlans();
    }
  }
}

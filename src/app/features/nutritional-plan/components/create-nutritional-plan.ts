import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NutritionalPlanService } from '../service/nutritional-plan.service';
import { UserResponse } from '../../shared/dto/user-response';
import { UserService } from '../../auth/user/service/user.service';
import { ROLES } from '../../../shared/constants/roles.constants';

@Component({
  selector: 'app-create-nutritional-plan',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-nutritional-plan.html',
  styleUrls: ['./create-nutritional-plan.scss']
})
export class CreateNutritionalPlanComponent implements OnInit {
  @Output() public closeModal = new EventEmitter<boolean>();

  public planForm!: FormGroup;
  public clients: UserResponse[] = [];
  public nutritionists: UserResponse[] = [];
  public isSubmitting = false;
  public loadError: string | null = null;

  private _nutritionalPlanService = inject(NutritionalPlanService);
  private _userService = inject(UserService);
  private _formBuilder = inject(FormBuilder);

  public ngOnInit(): void {
    this.planForm = this._formBuilder.group({
      clientId: ['', Validators.required],
      nutritionistId: ['', Validators.required],
      planDetails: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.loadUsers();
  }

  public loadUsers(): void {
    this._userService
      .getUsers()
      .then((users) => {
        this.clients = users.filter((u) => u.role === ROLES.CLIENT);
        this.nutritionists = users.filter((u) => u.role === ROLES.NUTRITIONIST);
      })
      .catch((err) => {
        console.error(err);
        this.loadError = 'Could not load users';
      });
  }

  public cancel(): void {
    this.closeModal.emit(false);
  }

  public save(): void {
    if (this.planForm.invalid) {
      this.planForm.markAllAsTouched();
      return;
    }

    const planData = this.planForm.value;

    this.isSubmitting = true;

    this._nutritionalPlanService.createPlan(planData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeModal.emit(true);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        alert('Error creating plan');
      }
    });
  }
}

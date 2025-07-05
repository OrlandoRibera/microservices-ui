import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { FoodPackage } from '../../interfaces/food-package.interface';
import { CreateFoodInPackageService, CreateFoodRequest } from '../../services/create-food-in-package.services';
import { DispatchFoodPackage } from '../../services/dispatch-food-package';
import { PackFoodPackage } from '../../services/pack-food-package';
import { UpdateFoodStatus } from '../../services/update-food-status';

@Component({
  selector: 'app-food-package',
  imports: [ReactiveFormsModule],
  templateUrl: './food-package.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodPackageComponent {
  private readonly _CREATE_FOOD_SERVICE = inject(CreateFoodInPackageService);
  private readonly _UPDATE_FOOD_STATUS_SERVICE = inject(UpdateFoodStatus);
  private readonly _DISPATCH_FOOD_PACKAGE_SERVICE = inject(DispatchFoodPackage);
  private readonly _PACK_FOOD_PACKAGE_SERVICE = inject(PackFoodPackage);
  private readonly _FORM_BUILDER = inject(FormBuilder);

  public foodPackage = input.required<FoodPackage>();

  public showModal = signal(false);
  public isLoading = signal(false);
  public foodForm: FormGroup;

  public foodTypes = [
    { value: 'BREAKFAST', label: 'Breakfast' },
    { value: 'LUNCH', label: 'Lunch' },
    { value: 'DINNER', label: 'Dinner' }
  ];

  constructor() {
    this.foodForm = this._FORM_BUILDER.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      type: ['BREAKFAST', Validators.required],
      kcal: [300, [Validators.required, Validators.min(1), Validators.max(2000)]]
    });
  }

  public openModal(): void {
    this.showModal.set(true);
  }

  public closeModal(): void {
    this.showModal.set(false);
    this.foodForm.reset({
      name: '',
      type: 'BREAKFAST',
      kcal: 300
    });
  }

  public createFood(): void {
    if (this.foodForm.valid) {
      this.isLoading.set(true);

      const request: CreateFoodRequest = {
        ...this.foodForm.value,
        foodPackageId: this.foodPackage().id
      };

      this._CREATE_FOOD_SERVICE
        .createFood(request)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: () => {
            this.closeModal();
          },
          error: (error) => {
            console.error('Error creating food:', error);
            alert(error.error.message || 'An error occurred while creating the food');
          }
        });
    }
  }

  public updateFoodStatus(foodId: string, currentStatus: string): void {
    if (currentStatus === 'COOKED') return;

    const nextStatus = this._getNextFoodStatus(currentStatus);
    this._UPDATE_FOOD_STATUS_SERVICE.updateFoodStatus(foodId, nextStatus).subscribe({
      next: () => {
        console.log('Food status updated successfully');
      },
      error: (error) => {
        console.error('Error updating food status:', error);
        alert(error.error.message || 'An error occurred while updating the food status');
      }
    });
  }

  public pack(): void {
    if (this.foodPackage().status !== 'COOKED') return;

    this._PACK_FOOD_PACKAGE_SERVICE.pack(this.foodPackage().id).subscribe({
      next: (response: FoodPackage) => {
        console.log('🎯 ~ FoodPackageComponent ~ this._PACK_FOOD_PACKAGE_SERVICE.pack ~ response:', response);
      },
      error: (error) => {
        console.error('Error packing food package:', error);
        alert(error.error.message || 'An error occurred while dispatching the food package');
      }
    });
  }

  public dispatch(): void {
    if (this.foodPackage().status !== 'PACKED') return;

    this._DISPATCH_FOOD_PACKAGE_SERVICE.dispatch(this.foodPackage().id).subscribe({
      next: (response: FoodPackage) => {
        console.log('🎯 ~ FoodPackageComponent ~ this._DISPATCH_FOOD_PACKAGE_SERVICE.dispatch ~ response:', response);
      },
      error: (error) => {
        console.error('Error dispatching food package:', error);
        alert(error.error.message || 'An error occurred while dispatching the food package');
      }
    });
  }

  private _getNextFoodStatus(currentStatus: string): string {
    if (currentStatus === 'PENDING') {
      return 'COOKING';
    }
    if (currentStatus === 'COOKING') {
      return 'COOKED';
    }
    return 'PENDING';
  }

  public getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'bg-warning text-dark';
      case 'COOKING':
        return 'bg-info text-white';
      case 'COOKED':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  }
}

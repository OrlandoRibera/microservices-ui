import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetFoodPackagesServices } from '../../services/get-food-packages.services';

@Component({
  selector: 'app-food-packages-list',
  standalone: true,
  templateUrl: './food-packages-list.html',
  styleUrl: './food-packages-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodPackagesList {
  private readonly _GET_FOOD_PACKAGES_SERVICES = inject(GetFoodPackagesServices);

  public foodPackages = toSignal(this._GET_FOOD_PACKAGES_SERVICES.getFoodPackages(), { initialValue: null });
}

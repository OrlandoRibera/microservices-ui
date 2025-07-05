import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { GetFoodPackages } from '../../services/get-food-packages.services';
import { FoodPackageComponent } from '../food-package/food-package';

@Component({
  selector: 'app-food-packages-list',
  standalone: true,
  imports: [RouterLink, FoodPackageComponent],
  templateUrl: './food-packages-list.html',
  styleUrl: './food-packages-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodPackagesList {
  private readonly _GET_FOOD_PACKAGES_SERVICES = inject(GetFoodPackages);

  public foodPackages = toSignal(this._GET_FOOD_PACKAGES_SERVICES.getFoodPackages(), { initialValue: null });
}

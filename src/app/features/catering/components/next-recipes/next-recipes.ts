import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { NextRecipes } from '../../interfaces/next-recipes.interface';
import { GetNextRecipes } from '../../services/get-next-recipes';
import { CreateFoodPackage } from '../../services/create-food-package';

@Component({
  selector: 'app-next-recipes',
  imports: [RouterLink],
  templateUrl: './next-recipes.html',
  styleUrl: './next-recipes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextRecipesComponent {
  private readonly _GET_NEXT_RECIPES = inject(GetNextRecipes);
  private readonly _CREATE_FOOD_PACKAGE = inject(CreateFoodPackage);
  private readonly _ROUTER = inject(Router);

  public nextRecipes = toSignal(this._GET_NEXT_RECIPES.getNextRecipes(), { initialValue: [] as NextRecipes[] });

  public createFoodPackage(recipe: NextRecipes): void {
    this._CREATE_FOOD_PACKAGE.create(recipe.id, recipe.clientId).subscribe({
      next: (response) => {
        const foodPackageId: string = response.id;
        this._ROUTER.navigate(['/catering/food-packages']);
        alert('Food package successfully created! Id: ' + foodPackageId);
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }
}

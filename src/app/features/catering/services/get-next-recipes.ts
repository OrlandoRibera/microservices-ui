import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NextRecipes } from '../interfaces/next-recipes.interface';
import { ROUTES } from '../../../shared/constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class GetNextRecipes {
  private readonly _HTTP = inject(HttpClient);

  public getNextRecipes(): Observable<NextRecipes[]> {
    return this._HTTP.get<NextRecipes[]>(`/${ROUTES.CATERING}/recipes`);
  }
}

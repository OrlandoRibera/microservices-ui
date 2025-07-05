export interface Food {
  foodId: string;
  name: string;
  status: 'PENDING' | 'COOKING' | 'COOKED';
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  kcal: number;
  foodPackageId: string;
}

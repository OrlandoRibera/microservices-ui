export interface NutritionalPlanResponse {
  id: string;
  clientId: string;
  nutritionistId: string;
  // disable-next-line @typescript-eslint/no-explicit-any
  analysisResults: any[];
  planDetails: string;
  delivered: boolean;
}
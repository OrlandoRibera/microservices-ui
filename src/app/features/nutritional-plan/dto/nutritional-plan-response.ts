export interface NutritionalPlanResponse {
  id: string;
  clientId: string;
  clientName: string;
  nutritionistId: string;
  nutritionistName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  analysisResults: any[];
  planDetails: string;
  delivered: boolean;
}

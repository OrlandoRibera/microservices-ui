export interface NutritionalPlanResponse {
  id: string;
  clientId: string;
  clientName: string;
  nutritionistId: string;
  nutritionistName: string;
  analysisResults: any[];
  planDetails: string;
  delivered: boolean;
}
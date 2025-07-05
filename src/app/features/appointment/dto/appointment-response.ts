import { AnalysisRequestResponse } from './analysis-request-response';

export interface AppointmentResponse {
  id: string;
  clientId: string;
  clientName: string;
  nutritionistId: string;
  nutritionistName: string;
  date: string;
  status: string;
  analysisRequestResponses: AnalysisRequestResponse[];
}

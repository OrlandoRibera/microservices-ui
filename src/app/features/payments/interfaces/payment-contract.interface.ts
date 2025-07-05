export interface PaymentContract {
  id: string;
  description: string;
  creationDate: string;
  status: string;
  cateringPlan: { id: string };
  customer: { id: string };
  totalAmount: number;
  quotas: number;
}

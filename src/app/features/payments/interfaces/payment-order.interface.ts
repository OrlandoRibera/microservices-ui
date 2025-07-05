export interface PaymentOrder {
  id: string;
  description: string;
  creationDate: string;
  status: string;
  amount: number;
  contract: { id: string };
}

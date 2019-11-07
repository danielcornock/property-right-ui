export interface IPayment {
  _id: string;
  user: string;
  tenant: string;
  property: string;
  amount: number;
  status: 'due' | 'overdue' | 'paid';
  due: Date;
  paid: boolean;
  recurring: boolean;
}

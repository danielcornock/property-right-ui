import { ITenant } from 'src/app/tenants/interfaces/ITenant';
import { IProperty } from 'src/app/properties/interfaces/IProperty';

export interface IPayment {
  _id: string;
  user: string;
  tenant: ITenant;
  property: IProperty;
  amount: number;
  status: 'due' | 'overdue' | 'paid';
  due: Date;
  paid: boolean;
  recurring: boolean;
}

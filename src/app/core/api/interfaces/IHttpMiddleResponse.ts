import { IHttpAuthResponse } from '../../../auth/interfaces/IHttpAuthResponse';
import { IProperty } from 'src/app/properties/interfaces/IProperty';
import { ITodo } from 'src/app/todos/interfaces/ITodo';
import { ITenant } from 'src/app/tenants/interfaces/ITenant';
import { IPayment } from 'src/app/payments/interfaces/IPayment';

export interface IHttpMiddleResponse {
  user?: IHttpAuthResponse;
  properties?: Array<IProperty>;
  property?: IProperty;
  todo?: ITodo;
  todos?: Array<ITodo>;
  tenant?: ITenant;
  tenants?: Array<ITenant>;
  payment?: IPayment;
  payments?: Array<IPayment>;
}

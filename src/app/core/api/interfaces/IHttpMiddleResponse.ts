import { IHttpAuthResponse } from '../../../auth/interfaces/IHttpAuthResponse';
import { IProperty } from 'src/app/properties/interfaces/IProperty';
import { ITodo } from 'src/app/todos/interfaces/ITodo';
import { ITenant } from 'src/app/tenants/interfaces/ITenant';

export interface IHttpMiddleResponse {
  user?: IHttpAuthResponse;
  properties?: Array<IProperty>;
  property?: IProperty;
  todo?: ITodo;
  todos?: Array<ITodo>;
  tenant?: ITenant;
  tenants?: Array<ITenant>;
}

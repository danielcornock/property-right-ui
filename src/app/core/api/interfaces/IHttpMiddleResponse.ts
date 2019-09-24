import { IHttpAuthResponse } from '../../../auth/interfaces/IHttpAuthResponse';
import { IProperty } from 'src/app/properties/interfaces/IProperty';
import { ITodo } from 'src/app/business/todos/interfaces/ITodo';

export interface IHttpMiddleResponse {
  user?: IHttpAuthResponse;
  properties?: Array<IProperty>;
  property?: IProperty;
  todo?: ITodo;
  todos?: Array<ITodo>;
}

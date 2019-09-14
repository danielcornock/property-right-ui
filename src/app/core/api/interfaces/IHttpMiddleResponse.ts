import { IHttpAuthResponse } from '../../../auth/interfaces/IHttpAuthResponse';
import { IProperty } from 'src/app/business/properties/interfaces/IProperty';

export interface IHttpMiddleResponse {
  user?: IHttpAuthResponse;
  properties?: Array<IProperty>;
  property?: IProperty;
}

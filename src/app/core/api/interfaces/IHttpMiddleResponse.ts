import { IHttpAuthResponse } from '../../../auth/interfaces/IHttpAuthResponse';

export interface IHttpMiddleResponse {
  user?: IHttpAuthResponse;
}

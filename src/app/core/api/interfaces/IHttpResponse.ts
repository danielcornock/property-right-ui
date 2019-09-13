import { IHttpMiddleResponse } from './IHttpMiddleResponse';

export interface IHttpResponse {
  status: string;
  token?: string;
  data: IHttpMiddleResponse;
}

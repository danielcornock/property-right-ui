import { ILoginResponse } from './ILoginResponse';

export interface IAuthResponse {
  status: string;
  token: string;
  user: ILoginResponse;
}

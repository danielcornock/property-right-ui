import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpLoginRequest } from '../login/interfaces/IHttpLoginRequest';
import { HttpService } from '../../core/api/http.service';
import { IHttpAuthResponse } from '../interfaces/IHttpAuthResponse';
import { IHttpResponse } from '../../core/api/interfaces/IHttpResponse';
import { IHttpErrorResponse } from 'src/app/core/api/interfaces/IHttpErrorResponse';
import { IHttpRegisterRequest } from '../register/interfaces/IHttpRegisterRequest';
import { JwtService } from './jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;
  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private jwt: JwtService
  ) {}

  login(user: IHttpLoginRequest): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpService.post('/users/login', user).subscribe(
        (res: IHttpResponse) => {
          const resUser: IHttpAuthResponse = res.data.user;
          if (res.token) {
            this.jwt.setToken(res.token);
            return resolve('You are now successfully logged in.');
          } else {
            reject("Sorry, we can't seem to log you in at the moment!");
          }
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          reject("Sorry, that's the wrong email or password");
        }
      );
    });
  }

  register(user: IHttpRegisterRequest): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpService.post('users/signup', user).subscribe(
        (res: IHttpResponse) => {
          const resUser: IHttpAuthResponse = res.data.user;
          if (res.token) {
            this.jwt.setToken(res.token);
            return resolve(
              'You have successfully created an account. You are now logged in.'
            );
          } else {
            reject('Your account has been created. Please log in to continue.');
          }
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          reject("Sorry, that's the wrong email or password");
        }
      );
    });
  }

  isLoggedIn() {
    return this.jwt.isLoggedIn();
  }

  logOut() {
    this.jwt.logOut();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest } from '../login/interfaces/ILoginRequest';
import { ILoginResponse } from '../login/interfaces/ILoginResponse';
import { HttpService } from '../../core/api/http.service';
import { IAuthResponse } from '../login/interfaces/IAuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;
  constructor(private http: HttpClient, private httpService: HttpService) {
    this.apiUrl = httpService.apiUrl;
  }

  login(user: ILoginRequest) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/users/login', user).subscribe(
        (response: IAuthResponse) => {
          const user: ILoginResponse = response.user;
          console.log(user);
          if (response.status === 'success') {
            localStorage.setItem('JWT', response.token);
          }
          resolve('You are now successfully logged in.');
        },
        error => {
          reject("Sorry, that's the wrong email or password");
        }
      );
    });
  }
}

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  jwtHelper = new JwtHelperService();
  constructor() {}

  public setToken(token: string, remember: boolean) {
    if (remember) {
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('name', this.jwtHelper.decodeToken(token).name);
    } else {
      sessionStorage.setItem('jwt_token', token);
      sessionStorage.setItem('name', this.jwtHelper.decodeToken(token).name);
    }

    console.log(localStorage.getItem('name') || sessionStorage.getItem('name'));
  }

  public getName() {
    return localStorage.getItem('name') || sessionStorage.getItem('name');
  }

  public logOut() {
    localStorage.removeItem('jwt_token');
    sessionStorage.removeItem('jwt_token');
    localStorage.removeItem('name');
    sessionStorage.removeItem('name');
  }

  public isAuthenticated() {
    const token =
      localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}

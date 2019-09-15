import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  jwtHelper = new JwtHelperService();
  constructor() {}

  public setToken(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  public logOut() {
    localStorage.setItem('jwt_token', '');
  }

  public isAuthenticated() {
    const token = localStorage.getItem('jwt_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}

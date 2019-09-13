import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() {}

  public setToken(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  public logOut() {
    localStorage.setItem('jwt_token', '');
  }

  public isLoggedIn() {
    return localStorage.getItem('jwt_token') ? true : false;
  }
}

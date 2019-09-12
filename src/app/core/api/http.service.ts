import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor() {}

  public apiUrl = 'http://localhost:2000/api/v1';
}

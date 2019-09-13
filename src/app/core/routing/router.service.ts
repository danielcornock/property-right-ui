import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private router: Router, private ngZone: NgZone) {}

  public navigate(url: string) {
    this.ngZone.run(() => this.router.navigate([url])).then();
  }
}

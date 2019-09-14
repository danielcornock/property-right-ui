import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RouterService } from 'src/app/core/routing/router.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: RouterService
  ) {}

  ngOnInit() {}

  public logout() {
    this.authService.logOut();
    this.router.navigate('login');
  }
}

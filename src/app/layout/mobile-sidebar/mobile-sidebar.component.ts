import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RouterService } from 'src/app/core/routing/router.service';

@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss']
})
export class MobileSidebarComponent implements OnInit {
  public navLinks = [
    {
      label: 'Dashboard',
      link: '/dashboard',
      icon: 'layout'
    },
    {
      label: 'My Properties',
      link: '/properties',
      icon: 'home'
    },
    {
      label: 'To Do',
      link: '/todos',
      icon: 'check-square'
    },
    {
      label: 'Tenants',
      link: '/tenants',
      icon: 'users'
    },
    {
      label: 'Payments',
      link: '/payments',
      icon: 'trending-up'
    }
  ];
  constructor(private authService: AuthService, private router: RouterService) {}

  ngOnInit() {}

  public logout() {
    this.authService.logOut();
    this.router.navigate('login');
  }
}

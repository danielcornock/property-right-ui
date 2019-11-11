import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RouterService } from 'src/app/core/routing/router.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
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

  public minimised: boolean =
    localStorage.getItem('sidebar-minimised') === 'true';
  constructor(
    private authService: AuthService,
    private router: RouterService
  ) {}

  ngOnInit() {}

  public logout() {
    this.authService.logOut();
    this.router.navigate('login');
  }

  public minimiseNav() {
    if (this.minimised) {
      localStorage.setItem('sidebar-minimised', 'false');
    } else {
      localStorage.setItem('sidebar-minimised', 'true');
    }
    this.minimised = !this.minimised;
  }

  public getNav() {
    return this.navLinks;
  }
}

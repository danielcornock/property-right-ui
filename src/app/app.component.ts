import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  public isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  public ngOnInit(): void {
    this.listenForTabbing();
  }

  private listenForTabbing() {
    window.addEventListener('keydown', handleFirstTab);

    function handleFirstTab(e) {
      if (e.keyCode === 9) {
        // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
  }
}

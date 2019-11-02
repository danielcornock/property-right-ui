import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../../core/routing/router.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: RouterService
  ) {}

  registerForm: FormGroup;
  isSubmitted: boolean;
  private remembered;

  ngOnInit() {
    this.isSubmitted = false;
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.min(8)]]
    });
  }

  public setRemember(remember: boolean) {
    this.remembered = remember;
  }

  register() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return console.error('You have not filled in all of the correct fields.');
    }
    this.authService
      .register(this.registerForm.value, this.remembered)
      .then(() => {
        this.router.navigate('dashboard');
      })
      .catch((jwt: boolean) => {
        if (jwt) {
          this.router.navigate('login');
        }
      });
  }
}

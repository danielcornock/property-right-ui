import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../../core/routing/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLoading: boolean;
  loginForm: FormGroup;

  private remembered = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: RouterService
  ) {}

  ngOnInit() {
    this.isLoading = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  public setRemember(event) {
    this.remembered = event;
  }

  login() {
    if (this.loginForm.invalid) {
      return console.error('This login form is invalid');
    }
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value, this.remembered)
      .then(() => {
        console.log('then');
        this.isLoading = false;
        this.router.navigate('properties');
      })
      .catch(() => {
        this.isLoading = false;
      });
  }
}

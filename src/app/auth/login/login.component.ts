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
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: RouterService
  ) {}

  loginForm: FormGroup;
  isSubmitted: boolean;

  ngOnInit() {
    this.isSubmitted = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return console.error('This login form is invalid');
    }
    this.authService
      .login(this.loginForm.value)
      .then(msg => {
        console.log(msg);
        this.router.navigate('dashboard');
      })
      .catch(err => {
        console.error(err);
      });
  }
}

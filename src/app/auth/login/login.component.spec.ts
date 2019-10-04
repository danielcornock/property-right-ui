import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let email,
    password,
    button,
    errors = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [LoginComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    email = component.loginForm.controls['email'];
    password = component.loginForm.controls['password'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the form values are empty', () => {
    it('should return an error', () => {
      expect(component.loginForm.valid).toBe(false);
    });

    it('should return an error for the email field', () => {
      expect(email.valid).toBe(false);
    });

    it('should return an error for the password field', () => {
      expect(password.valid).toBe(false);
    });
  });

  describe('when the email is not valid', () => {
    beforeEach(() => {
      email.setValue('test');
      errors = email.errors || {};
    });
    it('should have errors for email validation', () => {
      expect(errors['email']).toBe(true);
    });
  });

  describe('when the form is valid', () => {
    let emailErrors, passwordErrors;
    beforeEach(() => {
      email.setValue('test@email.com');
      password.setValue('password');
    });

    it('should state that the form is valid', () => {
      expect(component.loginForm.valid).toBe(true);
    });

    describe('when the form is submitted', () => {
      beforeEach(() => {
        email.setValue('test@email.com');
        password.setValue('password');
        button = fixture.debugElement.nativeElement.querySelector(
          '.login-form__submit'
        );
        button.click();
      });

      it('should call login function', () => {
        let loginSpy = spyOn(component, 'login');
        expect(loginSpy).toHaveBeenCalled();
      });
    });
  });
});

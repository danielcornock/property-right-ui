import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let name,
    email,
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
      declarations: [RegisterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    name = component.registerForm.controls['name'];
    email = component.registerForm.controls['email'];
    password = component.registerForm.controls['password'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the form values are empty', () => {
    it('should return an error', () => {
      expect(component.registerForm.valid).toBe(false);
    });

    it('should return an error for the name field', () => {
      expect(name.valid).toBe(false);
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

  describe('when the password is not valid', () => {
    beforeEach(() => {
      password.setValue('hi');
      errors = password.errors || {};
    });
    it('should have errors for email validation', () => {
      expect(errors['password']).toBe(true);
    });
  });
});

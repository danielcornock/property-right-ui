import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormInputComponent } from './form-input.component.interface';

@Component({
  template: ''
})
export class FormInputComponent implements IFormInputComponent {
  @Input() formInputParentForm: FormGroup;
  @Input() formInputControl: string;
  @Input() formInputLabel: string;
}

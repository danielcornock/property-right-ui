import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent extends FormInputComponent {
  constructor() {
    super();
  }
}

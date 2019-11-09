import { Component, OnInit, Input } from '@angular/core';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormGroup } from '@angular/forms';
import { IFormInputComponent } from '../form-input/form-input.component.interface';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent extends FormInputComponent
  implements OnInit, IFormInputComponent {
  @Input() formInputType: string = 'text';

  constructor() {
    super();
  }

  ngOnInit() {}
}

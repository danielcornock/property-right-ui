import { FormGroup } from '@angular/forms';

export interface IFormInputComponent {
  formInputControl: string;
  formInputParentForm: FormGroup;
  formInputLabel: string;
}

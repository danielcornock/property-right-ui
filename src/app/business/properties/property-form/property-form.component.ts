import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
  private propertyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.propertyForm = this.formBuilder.group({
      name: '',
      monthlyRent: ['', Validators.pattern('^[0-9]*$')]
    });
  }

  submit() {
    if (this.propertyForm.invalid) {
      return console.error('This form is invalid');
    }
    this.propertyService
      .addProperty(this.propertyForm.value)
      .then(msg => {
        console.log(msg);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

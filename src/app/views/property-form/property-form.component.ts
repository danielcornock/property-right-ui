import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { PropertyService } from '../../business/properties/services/property.service';
import { HttpService } from 'src/app/core/api/http.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
  private propertyForm: FormGroup;
  imagePreview: string;
  uploadedImage: File;

  constructor(
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.propertyForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      monthlyRent: new FormControl(null),
      image: new FormControl(null)
    });
    // this.propertyForm = this.formBuilder.group({
    //   name: '',
    //   monthlyRent: ['', Validators.pattern('^[0-9]*$')],
    //   image: null
    // });
  }

  public submit() {
    if (this.propertyForm.invalid) {
      return console.error('This form is invalid');
    }
    this.propertyService
      .addProperty(
        this.propertyForm.value.name,
        this.propertyForm.value.monthlyRent,
        this.propertyForm.value.image
      )
      .then(msg => {
        this.propertyForm.reset();
        console.log(msg);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public onImagePicked(event: Event) {
    if ((event.target as HTMLInputElement).files.length === 1) {
      const file = (event.target as HTMLInputElement).files[0];
      this.propertyForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}

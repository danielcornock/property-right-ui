import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IProperty } from 'src/app/properties/interfaces/IProperty';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
  private propertyForm: FormGroup;
  public property: IProperty;
  imagePreview: string;
  uploadedImage: File;
  editMode: boolean;
  activePropertyId: string;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.propertyForm = this._initialiseForm();
    this.editMode = this.router.url.includes('/properties/edit');
    this._checkForEditMode(this.editMode).then(() => {
      this._populateFields();
    });
  }

  private _populateFields() {
    this.propertyService.getProperty(this.activePropertyId).then(property => {
      this.property = property;
      this.propertyForm.setValue({
        name: this.property.name,
        monthlyRent: this.property.monthlyRent,
        image: this.property.image
      });
    });
  }

  private _checkForEditMode(editMode) {
    return new Promise(resolve => {
      if (editMode) {
        this.activeRoute.paramMap.subscribe(
          (params: ParamMap) =>
            (this.activePropertyId = params.get('propertyId'))
        );
        return resolve();
      }
    });
  }

  private _initialiseForm() {
    return new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      monthlyRent: new FormControl(null),
      image: new FormControl(null)
    });
  }

  private _postNewProperty() {
    this.propertyService.addProperty(this.propertyForm.value).then(id => {
      this.propertyForm.reset();
      this.router.navigate([`/properties/${id}`]);
    });
  }

  private _editProperty() {
    this.propertyService
      .updateProperty(this.propertyForm.value, this.activePropertyId)
      .then(() => {
        this.router.navigate([`/properties/${this.activePropertyId}`]);
      });
  }

  public submit() {
    if (this.propertyForm.invalid) {
      return console.error('This form is invalid');
    }

    if (this.editMode) {
      this._editProperty();
    } else {
      this._postNewProperty();
    }
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

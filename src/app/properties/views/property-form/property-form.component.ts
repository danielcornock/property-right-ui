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
  private hiddenForm: FormGroup;
  public property: IProperty;
  public address: any;
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
    this.editMode = !this.router.url.includes('/create');
    this._checkForEditMode(this.editMode).then(() => {
      this._populateFields();
    });
  }

  public handleAddressChange(address: any) {
    console.log(address);
    this.address = address;
    this.propertyForm.setValue({
      name: address.name,
      monthlyRent: this.propertyForm.value.monthlyRent,
      town: this._findTown(address.address_components),
      country: this._findCountry(address.address_components),
      image: this.propertyForm.value.image,
      url: address.url
    });

    console.log(this.propertyForm);
  }

  private _completePropertyForm(): IProperty {
    return {
      name: this.propertyForm.value.name,
      town: this.propertyForm.value.town,
      country: this.propertyForm.value.country,
      url: this.propertyForm.value.url,
      monthlyRent: this.propertyForm.value.monthlyRent,
      image: this.propertyForm.value.image
    };
  }

  private _findTown(addressComponents: any) {
    return addressComponents.find(component => {
      return (
        component.types.includes('postal_town') ||
        component.types.includes('locality')
      );
    }).long_name;
  }

  private _findCountry(addressComponents: any) {
    return addressComponents.find(component => {
      return component.types.includes('country');
    }).long_name;
  }

  private _populateFields() {
    this.propertyService.getProperty(this.activePropertyId).then(property => {
      this.property = property;
      this.propertyForm.setValue({
        name: this.property.name,
        monthlyRent: this.property.monthlyRent,
        image: this.property.image,
        town: this.property.town,
        country: this.property.country,
        url: this.property.url
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
      image: new FormControl(null),
      town: new FormControl(null),
      country: new FormControl(null),
      url: new FormControl(null)
    });
  }

  private _postNewProperty() {
    this.propertyService.addProperty(this._completePropertyForm()).then(id => {
      this.propertyForm.reset();
      this.router.navigate([`/properties/${id}`]);
    });
  }

  private _editProperty() {
    this.propertyService
      .updateProperty(this._completePropertyForm(), this.activePropertyId)
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

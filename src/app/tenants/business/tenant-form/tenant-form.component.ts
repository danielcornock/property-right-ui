import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPropertyDropdownOption } from 'src/app/todos/todo-create/interfaces/IPropertyDropdownOption';
import { TenantService } from '../../services/tenant.service';
import { PropertyService } from 'src/app/properties/services/property.service';
import { IProperty } from 'src/app/properties/interfaces/IProperty';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss']
})
export class TenantFormComponent implements OnInit {
  @Input() propertyId: string;
  private tenantForm: FormGroup;
  public propertyOptions: Array<IPropertyDropdownOption> = [];
  public isLoading: boolean;
  public isModal: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private tenantService: TenantService,
    private propertyService: PropertyService,
    private matDialogRef: MatDialogRef<TenantFormComponent>
  ) {}

  ngOnInit() {
    this.isLoading = false;
    this.tenantForm = this._initialiseTenantForm();
    this._setPropertyDropdownOptions();
  }

  public submitTenant() {
    if (this.tenantForm.invalid) {
      return console.error('Some details in the tenant form are incorrect.');
    }
    if (this.propertyId) {
      this.tenantForm.value.propertyId = this.propertyId;
    }
    this.isLoading = true;
    this.tenantService
      .createTenant(this.tenantForm.value)
      .then(() => {
        this.tenantForm = this._initialiseTenantForm();
        this.matDialogRef.close();
      })
      .catch(() => {
        this.isLoading = false;
      });
  }
  private _initialiseTenantForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: '',
      propertyId: null
    });
  }

  private _setPropertyDropdownOptions(): void {
    this.propertyService
      .getAllProperties()
      .then((propertiesResponse: Array<IProperty>) => {
        this.propertyOptions = propertiesResponse.map(property => {
          return {
            name: property.name,
            id: property._id
          };
        });
      });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IProperty } from 'src/app/properties/interfaces/IProperty';
import { PropertyService } from 'src/app/properties/services/property.service';
import { IPropertyDropdownOption } from 'src/app/todos/todo-create/interfaces/IPropertyDropdownOption';

import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss']
})
export class TenantFormComponent implements OnInit {
  public tenantForm: FormGroup;
  public propertyOptions: Array<IPropertyDropdownOption> = [];
  public isLoading: boolean = true;
  public isModal: boolean = true;
  public propertyId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private tenantService: TenantService,
    private propertyService: PropertyService,
    private matDialogRef: MatDialogRef<TenantFormComponent>
  ) {
    console.log(data);
    if (data.data && data.data.propertyId) {
      this.propertyId = data.data.propertyId;
    }
  }

  async ngOnInit() {
    this.tenantForm = this._initialiseTenantForm();
    if (!this.propertyId) {
      await this._setPropertyDropdownOptions();
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }
  }

  public submitTenant() {
    if (this.propertyId) {
      this.tenantForm.value.property = this.propertyId;
    }
    if (this.tenantForm.invalid) {
      return console.error('Some details in the tenant form are incorrect.');
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

  public closeModal() {
    this.matDialogRef.close(false);
  }
  private _initialiseTenantForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: '',
      property: null
    });
  }

  private async _setPropertyDropdownOptions(): Promise<void> {
    const propertiesResponse: Array<IProperty> = await this.propertyService.getAllProperties();
    this.propertyOptions = propertiesResponse.map((property) => {
      return {
        name: property.name,
        id: property._id
      };
    });
  }
}

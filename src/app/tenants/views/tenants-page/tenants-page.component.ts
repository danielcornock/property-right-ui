import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TenantFormComponent } from '../../business/tenant-form/tenant-form.component';

@Component({
  selector: 'app-tenants-page',
  templateUrl: './tenants-page.component.html',
  styleUrls: ['./tenants-page.component.scss']
})
export class TenantsPageComponent implements OnInit {
  private dialogRef: MatDialogRef<TenantFormComponent>;
  constructor(private matDialog: MatDialog) {}

  ngOnInit() {}

  openModal() {
    this.dialogRef = this.matDialog.open(TenantFormComponent);
  }
}

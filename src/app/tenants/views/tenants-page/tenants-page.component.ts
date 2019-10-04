import { Component, OnInit } from '@angular/core';
import { TenantFormComponent } from '../../business/tenant-form/tenant-form.component';
import { ModalService } from 'src/app/core/modal/modal.service';

@Component({
  selector: 'app-tenants-page',
  templateUrl: './tenants-page.component.html',
  styleUrls: ['./tenants-page.component.scss']
})
export class TenantsPageComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  openCreateTenantModal() {
    this.modalService.openModal(TenantFormComponent);
  }
}

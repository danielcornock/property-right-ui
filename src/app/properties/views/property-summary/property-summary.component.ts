import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProperty } from 'src/app/properties/interfaces/IProperty';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from 'src/app/properties/services/property.service';
import { RouterService } from 'src/app/core/routing/router.service';
import { ModalService } from 'src/app/core/modal/modal.service';
import { TenantFormComponent } from 'src/app/tenants/business/tenant-form/tenant-form.component';
import { TodoCreateComponent } from 'src/app/todos/todo-create/todo-create.component';

@Component({
  selector: 'app-property-summary',
  templateUrl: './property-summary.component.html',
  styleUrls: ['./property-summary.component.scss']
})
export class PropertySummaryComponent implements OnInit {
  public property: IProperty;
  public propertyId: string;
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: RouterService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.propertyId = paramMap.get('propertyId');
      this.propertyService
        .getProperty(this.propertyId)
        .then((property: IProperty) => {
          if (!property) {
            return this.router.navigate('/properties');
          }
          this.property = property;
        });
    });
  }

  public openCreateTenantModal() {
    this.modalService.openModal(TenantFormComponent, {
      propertyId: this.propertyId
    });
  }

  public openCreateTodoModal() {
    this.modalService.openModal(TodoCreateComponent, {
      propertyId: this.propertyId
    });
  }

  public openConfirmDeleteModal() {
    this.modalService
      .openConfirmationModal({
        object: 'property'
      })
      .then(() => {
        this._deleteProperty();
      })
      .catch(() => {});
  }

  private _deleteProperty() {
    this.propertyService.deleteProperty(this.propertyId).then(() => {
      this.router.navigate('/properties');
    });
  }
}

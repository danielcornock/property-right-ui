import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProperty } from 'src/app/properties/interfaces/IProperty';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from 'src/app/properties/services/property.service';
import { RouterService } from 'src/app/core/routing/router.service';
import { ModalService } from 'src/app/core/modal/modal.service';
import { TenantFormComponent } from 'src/app/tenants/business/tenant-form/tenant-form.component';
import { TodoCreateComponent } from 'src/app/todos/todo-create/todo-create.component';

@Component({
  templateUrl: './property-summary-view.component.html',
  styleUrls: ['./property-summary-view.component.scss']
})
export class PropertySummaryViewComponent implements OnInit {
  public property: IProperty;
  public propertyId: string;
  public isLoading: boolean;
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: RouterService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.propertyId = paramMap.get('propertyId');
      this.propertyService
        .getProperty(this.propertyId)
        .then((property: IProperty) => {
          if (!property) {
            return this.router.navigate('/properties');
          }
          this.isLoading = false;
          this.property = property;
        })
        .catch(() => {
          this.isLoading = false;
        });
    });
  }

  public getPropertyUrl() {
    return `https://www.google.com/maps${this.property.url}&output=embed`;
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

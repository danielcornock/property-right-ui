import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ITenant } from '../../interfaces/ITenant';
import { TenantService } from '../../services/tenant.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit, OnDestroy {
  @Input() propertyId: string = '';
  public tenants: Array<ITenant>;
  public isLoading: boolean;

  private tenantSub: Subscription;

  constructor(private tenantService: TenantService) {}

  ngOnInit() {
    this.isLoading = true;
    this._fetchTenants();
    this._observeNewTenants();
  }

  private _fetchTenants() {
    this.tenantService
      .getTenants(this.propertyId)
      .then((tenants: Array<ITenant>) => {
        this.tenants = tenants;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
      });
  }

  private _observeNewTenants(): void {
    this.tenantSub = this.tenantService.tenantObservable.subscribe(
      (tenant: ITenant) => {
        this.tenants.push(tenant);
      }
    );
  }

  ngOnDestroy() {
    this.tenantSub.unsubscribe();
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/api/http.service';
import { ITenant } from '../interfaces/ITenant';
import { IHttpResponse } from 'src/app/core/api/interfaces/IHttpResponse';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/components/toast-messages/toast.service';
import { IHttpErrorResponse } from 'src/app/core/api/interfaces/IHttpErrorResponse';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  public tenantObservable = new Subject<ITenant>();

  constructor(private http: HttpService, private toast: ToastService) {}

  public createTenant(tenant: ITenant): Promise<void> {
    console.log('here');
    return new Promise((resolve, reject) => {
      this.http.post('tenants', tenant).subscribe(
        (res: IHttpResponse) => {
          const tenantResponse: ITenant = res.data.tenant;
          this.tenantObservable.next(tenantResponse);
          this.toast.success('Tenant successfully added.');
          resolve();
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error("Something's gone wrong!");
          reject();
        }
      );
    });
  }

  public getTenants(propertyId?: string): Promise<Array<ITenant>> {
    return new Promise((resolve, reject) => {
      this.http.get(this._setTenantRoute(propertyId)).subscribe(
        (res: IHttpResponse) => {
          const tenants: Array<ITenant> = res.data.tenants;
          resolve(tenants);
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error('Not able to fetch tenants at this time!');
          reject();
        }
      );
    });
  }

  public getTenant(id: string): Promise<ITenant> {
    return new Promise((resolve, reject) => {
      this.http.get(`tenants/${id}`).subscribe(
        (res: IHttpResponse) => {
          const tenant: ITenant = res.data.tenant;
          resolve(tenant);
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error('Unable to fetch tenant at this time.');
          reject();
        }
      );
    });
  }

  public deleteTenant(id: string): Promise<ITenant> {
    return new Promise((resolve, reject) => {
      this.http.delete(`tenants/${id}`).subscribe(
        (res: IHttpResponse) => {
          this.toast.success('Tenant successfully deleted.');
          resolve();
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error('Unable to delete tenant at this time.');
          reject();
        }
      );
    });
  }

  private _setTenantRoute(propertyId: string) {
    if (propertyId) {
      return `properties/${propertyId}/tenants`;
    } else {
      return 'tenants';
    }
  }
}

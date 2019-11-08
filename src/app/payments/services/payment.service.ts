import { Injectable } from '@angular/core';
import { IPayment } from '../interfaces/IPayment';
import { HttpService } from 'src/app/core/api/http.service';
import { ToastService } from 'src/app/components/toast-messages/toast.service';
import { IHttpErrorResponse } from 'src/app/core/api/interfaces/IHttpErrorResponse';
import { Subject } from 'rxjs';
import { IHttpResponse } from 'src/app/core/api/interfaces/IHttpResponse';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  public paymentObservable: Subject<IPayment> = new Subject<IPayment>();
  public paymentRefresh: Subject<void> = new Subject<void>();

  constructor(private http: HttpService, private toast: ToastService) {}

  public createPayment(payment: IPayment): Promise<void> {
    console.log('here');
    return new Promise((resolve, reject) => {
      this.http.post('payments', payment).subscribe(
        (res: IHttpResponse) => {
          const paymentResponse: IPayment = res.data.payment;
          this.paymentRefresh.next();
          this.toast.success('Payment successfully added.');
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

  public getPayments(parent?: {
    propertyId?: string;
    tenantId?: string;
  }): Promise<Array<IPayment>> {
    return new Promise((resolve, reject) => {
      this.http.get(this._setPaymentRoute(parent)).subscribe(
        (res: IHttpResponse) => {
          const payments: Array<IPayment> = res.data.payments;
          resolve(payments);
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error('Not able to fetch payments at this time!');
          reject();
        }
      );
    });
  }

  public deletePayment(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete(`payments/${id}`).subscribe(
        () => {
          this.toast.success('Payment deleted.');
          resolve();
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error('Unable to delete payment at this time.');
          reject();
        }
      );
    });
  }

  public updatePayment(payment: Partial<IPayment>, paymentId: string) {
    return new Promise((resolve, reject) => {
      this.http.put(`payments/${paymentId}`, payment).subscribe(
        (res: IHttpResponse) => {
          this.paymentRefresh.next();
          // this.toast.success('Payment updated!');
          resolve();
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error('Not able to update payment at this time.');
          reject();
        }
      );
    });
  }

  private _setPaymentRoute(parent: { propertyId?: string; tenantId?: string }) {
    if (parent && parent.propertyId) {
      return `properties/${parent.propertyId}/payments`;
    } else if (parent && parent.tenantId) {
      return `tenants/${parent.tenantId}/payments`;
    } else {
      return 'payments';
    }
  }
}

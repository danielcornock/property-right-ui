import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/core/api/http.service';
import { IHttpResponse } from '../../core/api/interfaces/IHttpResponse';
import { IProperty } from '../../properties/interfaces/IProperty';
import { PropertyService } from 'src/app/properties/services/property.service';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/auth/services/jwt/jwt.service';
import { PaymentService } from 'src/app/payments/services/payment.service';
import { IPayment } from 'src/app/payments/interfaces/IPayment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public properties: Array<IProperty>;
  public payments: Array<IPayment>;

  private propertiesSub: Subscription;

  constructor(
    private propertyService: PropertyService,
    private jwtService: JwtService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.propertyService
      .getAllProperties()
      .then((properties: Array<IProperty>) => {
        this.properties = properties;
      });

    this._getPayments();

    this.paymentService.paymentRefresh.subscribe(() => {
      this._getPayments();
    });

    this.propertiesSub = this.propertyService
      .getPostUpdateListener()
      .subscribe((properties: Array<IProperty>) => {
        this.properties = properties;
      });
  }

  private _getPayments() {
    this.paymentService
      .getUrgentPayments()
      .then((payments: Array<IPayment>) => {
        this.payments = payments;
      });
  }

  getUserName() {
    return this.jwtService.getName();
  }

  ngOnDestroy() {
    this.propertiesSub.unsubscribe();
  }
}

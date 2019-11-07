import { Component, OnInit } from '@angular/core';
import { ITenant } from '../../interfaces/ITenant';
import { TenantService } from '../../services/tenant.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RouterService } from 'src/app/core/routing/router.service';
import { ModalService } from 'src/app/core/modal/modal.service';
import { PaymentCreateComponent } from 'src/app/payments/business/payment-create/payment-create.component';
import { PaymentService } from 'src/app/payments/services/payment.service';
import { IPayment } from 'src/app/payments/interfaces/IPayment';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-tenant-overview-page',
  templateUrl: './tenant-overview-page.component.html',
  styleUrls: ['./tenant-overview-page.component.scss']
})
export class TenantOverviewPageComponent implements OnInit {
  public tenant: ITenant;
  public tenantId: string;
  public isLoading: boolean;
  public payments: Array<IPayment>;
  public paymentRefresh: Observable<void>;

  constructor(
    private tenantService: TenantService,
    private route: ActivatedRoute,
    private router: RouterService,
    private modalService: ModalService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this._watchPayments();
    this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.tenantId = paramMap.get('tenantId');
      try {
        this.tenant = await this.tenantService.getTenant(this.tenantId);
        this.payments = await this.paymentService.getPayments({
          tenantId: this.tenantId
        });
        this.isLoading = false;
      } catch {
        this.isLoading = false;
      }
    });
  }

  private _watchPayments() {
    this.paymentService.paymentRefresh.subscribe(async () => {
      this.payments = await this.paymentService.getPayments({
        tenantId: this.tenantId
      });
    });
  }

  public openCreatePaymentModal() {
    this.modalService.openModal(PaymentCreateComponent, {
      tenantId: this.tenantId,
      propertyId: this.tenant.property._id
    });
  }

  public openConfirmDeleteModal() {
    this.modalService
      .openConfirmationModal({
        object: 'tenant'
      })
      .then(() => {
        this._deleteTenant();
      })
      .catch(() => {});
  }

  public _deleteTenant() {
    this.tenantService.deleteTenant(this.tenantId).then(() => {
      this.router.navigate('/tenants');
    });
  }
}

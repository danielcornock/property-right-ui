import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { IPayment } from '../../interfaces/IPayment';

@Component({
  selector: 'app-payments-view',
  templateUrl: './payments-view.component.html',
  styleUrls: ['./payments-view.component.scss']
})
export class PaymentsViewComponent implements OnInit {
  public payments: Array<IPayment>;
  public isLoading: boolean;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.isLoading = true;
    this.paymentService
      .getPayments()
      .then((payments: Array<IPayment>) => {
        this.payments = payments;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
      });
  }
}

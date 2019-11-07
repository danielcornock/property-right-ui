import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  OnDestroy,
  OnInit
} from '@angular/core';
import { IPayment } from '../../interfaces/IPayment';
import { MatTable } from '@angular/material';
import { Subscription } from 'rxjs';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnChanges, OnInit, OnDestroy {
  @Input() paymentListPayments: Array<IPayment>;

  private paymentSub: Subscription;

  @ViewChild('paymentTable', { static: true }) paymentTable: MatTable<string>;

  public columnsToDisplay = ['amount', 'status', 'due', 'recurring', 'actions'];

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this._subscribeToPayments();
  }

  ngOnChanges() {
    console.log('changes');
    // this.paymentTable.renderRows();
  }

  public markAsPaid(id: string) {
    this.paymentService.updatePayment({ paid: true }, id);
  }

  public toggleRecurring(id: string, currentlyRecurring: boolean) {
    this.paymentService.updatePayment({ recurring: !currentlyRecurring }, id);
  }

  public deletePayment(id: string) {
    this.paymentService.deletePayment(id).then(() => {
      this.paymentListPayments = this.paymentListPayments.filter(
        (payment: IPayment) => {
          return payment._id !== id;
        }
      );
    });
  }

  private _subscribeToPayments() {
    this.paymentSub = this.paymentService.paymentObservable.subscribe(
      (payment: IPayment) => {
        this.paymentListPayments.unshift(payment);
        this.paymentTable.renderRows();
      }
    );
  }

  ngOnDestroy() {
    this.paymentSub.unsubscribe();
  }
}

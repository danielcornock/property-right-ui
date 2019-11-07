import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.scss']
})
export class PaymentCreateComponent implements OnInit {
  private propertyId: string;
  private tenantId: string;
  private paymentForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private matDialogRef: MatDialogRef<PaymentCreateComponent>
  ) {
    console.log(data.data.data);
    if (data.data) {
      console.log(data.data);
      this.propertyId = data.data.propertyId;
      this.tenantId = data.data.tenantId;
    }
  }

  ngOnInit() {
    this.paymentForm = this._initialisePaymentForm();
    console.log(this.paymentForm.value);
  }

  public submitPayment() {
    if (this.paymentForm.invalid) {
      return console.error('This form is invalid!');
    }
    console.log(this.paymentForm.value);

    this.paymentService
      .createPayment(this.paymentForm.value)
      .then(() => {
        this.matDialogRef.close();
      })
      .catch(() => {});
  }

  public closeModal() {
    this.matDialogRef.close();
  }

  public toggleRecurring() {
    this.paymentForm.value.recurring = !this.paymentForm.value.recurring;
    console.log(this.paymentForm.value.recurring);
  }

  public togglePaid() {
    this.paymentForm.value.paid = !this.paymentForm.value.paid;
    console.log(this.paymentForm.value.paid);
  }

  private _initialisePaymentForm(): FormGroup {
    return this.formBuilder.group({
      amount: ['', Validators.required],
      due: ['', Validators.required],
      paid: false,
      recurring: false,
      property: this.propertyId,
      tenant: this.tenantId
    });
  }
}

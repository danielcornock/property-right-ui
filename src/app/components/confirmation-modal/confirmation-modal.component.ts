import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  public object: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {
    this.object = data.data.object;
  }

  ngOnInit() {}

  public accept() {
    this.dialogRef.close(true);
  }

  public deny() {
    this.dialogRef.close(false);
  }
}

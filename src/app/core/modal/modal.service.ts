import { Injectable, ComponentRef } from '@angular/core';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private defaultObject: string = '';
  private dialogRef: MatDialogRef<ConfirmationModalComponent>;
  constructor(private matDialog: MatDialog) {}

  public openConfirmationModal(data: any) {
    this.dialogRef = this.matDialog.open(ConfirmationModalComponent, {
      data: {
        data
      }
    });

    return new Promise((resolve, reject) => {
      this.dialogRef.afterClosed().subscribe(confirm => {
        return confirm ? resolve() : reject();
      });
    });
  }

  public openModal(component, data: any) {
    this.dialogRef = this.matDialog.open(component, {
      data: {
        data
      }
    });
  }
}

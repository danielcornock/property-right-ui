import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toast: ToastrService) {}

  public success(msg: string) {
    this.toast.success(msg, 'Success!');
  }

  public blankSuccess(msg: string, title?: string) {
    this.toast.success(msg, title);
  }

  public error(msg: string) {
    this.toast.error(msg, 'Uh oh!');
  }
}

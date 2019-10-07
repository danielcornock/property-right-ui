import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  public isChecked: boolean;
  @Input() label: string;
  @Input() checkboxDefault: boolean;
  constructor() {}

  ngOnInit() {
    if (this.checkboxDefault) {
      this.isChecked = true;
    }
  }
}

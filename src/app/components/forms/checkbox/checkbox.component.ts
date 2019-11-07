import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  public isChecked: boolean;
  @Input() label: string;
  @Input() checkboxDefault: boolean;
  @Output() checkboxIsChecked: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  constructor() {}

  ngOnInit() {
    if (this.checkboxDefault) {
      this.isChecked = true;
    }
  }

  public onChange(event) {
    console.log(event.target);
    if (event.target.value === 'on') {
      this.checkboxIsChecked.emit(true);
    } else {
      this.checkboxIsChecked.emit(false);
    }
  }
}

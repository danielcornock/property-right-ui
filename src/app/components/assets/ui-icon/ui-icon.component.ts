import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ui-icon',
  templateUrl: './ui-icon.component.html',
  styleUrls: ['./ui-icon.component.scss']
})
export class UiIconComponent implements OnInit {
  @Input() size: string;
  @Input() name: string;

  constructor() {}

  ngOnInit() {}
}

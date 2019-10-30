import { Component, OnInit, Input } from '@angular/core';
import { IProperty } from '../../interfaces/IProperty';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {
  constructor() {}

  @Input() public propertiesListProperties: Array<IProperty>;

  ngOnInit() {}
}

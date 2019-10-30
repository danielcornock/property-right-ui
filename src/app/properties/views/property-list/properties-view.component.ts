import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from 'src/app/properties/services/property.service';
import { IProperty } from 'src/app/properties/interfaces/IProperty';
import { TodoService } from 'src/app/todos/services/todo.service';

@Component({
  templateUrl: './properties-view.component.html',
  styleUrls: ['./properties-view.component.scss']
})
export class PropertiesViewComponent implements OnInit {
  constructor(private propertyService: PropertyService) {}

  public pageTitle: string = 'Your Properties';

  public isLoading: boolean;

  public properties: Array<IProperty>;

  private propertiesFilterable: Array<IProperty>;

  ngOnInit() {
    this.isLoading = true;

    this.propertyService
      .getAllProperties()
      .then((results: Array<IProperty>) => {
        this.propertiesFilterable = results;
        this.properties = this.propertiesFilterable;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
      });
  }

  public searchProperties(query: string) {
    this.properties = this.propertiesFilterable.filter(property => {
      return property.name.toLowerCase().includes(query);
    });
  }
}

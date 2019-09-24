import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from 'src/app/properties/services/property.service';
import { IProperty } from 'src/app/properties/interfaces/IProperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  public isLoading: boolean;
  public properties: Array<IProperty>;
  private propertiesSub: Subscription;
  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.propertyService
      .getAllProperties()
      .then((properties: Array<IProperty>) => {
        this.properties = properties;
      })
      .catch(err => {
        console.log(err);
      });

    this.propertiesSub = this.propertyService
      .getPostUpdateListener()
      .subscribe((properties: Array<IProperty>) => {
        this.properties = properties;
      });
  }

  ngOnDestroy() {
    this.propertiesSub.unsubscribe();
  }
}

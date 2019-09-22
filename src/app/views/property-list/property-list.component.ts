import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from 'src/app/business/properties/services/property.service';
import { IProperty } from 'src/app/business/properties/interfaces/IProperty';

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

  public deleteProperty(id: string) {
    this.propertyService
      .deleteProperty(id)
      .then((msg: string) => {
        console.log(msg);
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnDestroy() {
    this.propertiesSub.unsubscribe();
  }
}

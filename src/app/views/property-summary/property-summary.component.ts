import { Component, OnInit } from '@angular/core';
import { IProperty } from 'src/app/business/properties/interfaces/IProperty';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from 'src/app/business/properties/services/property.service';

@Component({
  selector: 'app-property-summary',
  templateUrl: './property-summary.component.html',
  styleUrls: ['./property-summary.component.scss']
})
export class PropertySummaryComponent implements OnInit {
  public property: IProperty;
  public propertyId: string;
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('propertyId')) {
        this.propertyId = paramMap.get('propertyId');
        this.propertyService
          .getProperty(this.propertyId)
          .then((property: IProperty) => {
            this.property = property;
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
}

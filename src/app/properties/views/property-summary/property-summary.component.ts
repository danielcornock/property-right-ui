import { Component, OnInit } from '@angular/core';
import { IProperty } from 'src/app/properties/interfaces/IProperty';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from 'src/app/properties/services/property.service';
import { RouterService } from 'src/app/core/routing/router.service';

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
    private propertyService: PropertyService,
    private router: RouterService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.propertyId = paramMap.get('propertyId');
      this.propertyService
        .getProperty(this.propertyId)
        .then((property: IProperty) => {
          this.property = property;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  public deleteProperty() {
    this.propertyService.deleteProperty(this.propertyId).then(() => {
      console.log('Property Deleted.');
      this.router.navigate('/properties');
    });
  }
}

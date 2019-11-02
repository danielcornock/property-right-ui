import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/core/api/http.service';
import { IHttpResponse } from '../../core/api/interfaces/IHttpResponse';
import { IProperty } from '../../properties/interfaces/IProperty';
import { PropertyService } from 'src/app/properties/services/property.service';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/auth/services/jwt/jwt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public properties: Array<IProperty>;
  private propertiesSub: Subscription;
  constructor(
    private propertyService: PropertyService,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    this.propertyService
      .getAllProperties()
      .then((properties: Array<IProperty>) => {
        this.properties = properties;
      });

    this.propertiesSub = this.propertyService
      .getPostUpdateListener()
      .subscribe((properties: Array<IProperty>) => {
        this.properties = properties;
      });
  }

  getUserName() {
    return this.jwtService.getName();
  }

  ngOnDestroy() {
    this.propertiesSub.unsubscribe();
  }
}

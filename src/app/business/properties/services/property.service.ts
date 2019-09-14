import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/api/http.service';
import { IProperty } from '../interfaces/IProperty';
import { IHttpErrorResponse } from 'src/app/core/api/interfaces/IHttpErrorResponse';
import { IHttpResponse } from 'src/app/core/api/interfaces/IHttpResponse';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private propertyObservable = new Subject<IProperty[]>();
  private properties: Array<IProperty>;

  constructor(private httpService: HttpService) {}

  public addProperty(property: IProperty) {
    return new Promise((resolve, reject) => {
      this.httpService.post('properties', property).subscribe(
        (res: IHttpResponse) => {
          const propertyResponse: IProperty = res.data.property;
          this.properties.push(propertyResponse);
          this.propertyObservable.next(this.properties);
          resolve('Property successfully added.');
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          reject("Something's gone wrong!");
        }
      );
    });
  }

  public getAllProperties(): Promise<Array<IProperty>> {
    return new Promise((resolve, reject) => {
      this.httpService.get('properties').subscribe(
        (res: IHttpResponse) => {
          const properties: Array<IProperty> = res.data.properties;
          this.properties = properties;
          resolve(properties);
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          reject("Something's gone wrong!");
        }
      );
    });
  }

  public getPostUpdateListener() {
    return this.propertyObservable.asObservable();
  }
}

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

  public addProperty(property: IProperty): Promise<string> {
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
      if (this.properties) return resolve(this.properties);

      this.httpService.get('properties').subscribe(
        (res: IHttpResponse) => {
          const properties: Array<IProperty> = res.data.properties;
          this.properties = properties;
          resolve(this.properties);
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          reject('Not able to retrive properties at this time.');
        }
      );
    });
  }
  public deleteProperty(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpService.delete(`properties/${id}`).subscribe(
        () => {
          this.properties = this.properties.filter(
            property => property._id !== id
          );
          this.propertyObservable.next([...this.properties]);
          resolve('Property successfully deleted.');
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          reject('Not able to delete property at this time.');
        }
      );
    });
  }

  public getPostUpdateListener() {
    return this.propertyObservable.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/api/http.service';
import { IProperty } from '../interfaces/IProperty';
import { IHttpErrorResponse } from 'src/app/core/api/interfaces/IHttpErrorResponse';
import { IHttpResponse } from 'src/app/core/api/interfaces/IHttpResponse';
import { Subject } from 'rxjs';
import { CacheService } from 'src/app/core/cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private propertyObservable = new Subject<IProperty[]>();
  private properties: Array<IProperty>;

  constructor(private httpService: HttpService) {}

  public addProperty(
    name: string,
    monthlyRent: string,
    image: File
  ): Promise<string> {
    const propertyData = new FormData();
    propertyData.append('name', name);
    propertyData.append('monthlyRent', monthlyRent);
    propertyData.append('image', image);

    return new Promise((resolve, reject) => {
      this.httpService.post('properties', propertyData).subscribe(
        (res: IHttpResponse) => {
          const propertyResponse: IProperty = res.data.property;
          if (this.properties) {
            this.properties.push(propertyResponse);
          }
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

  public getAllProperties(): Promise<IProperty | Array<IProperty>> {
    return new Promise((resolve, reject) => {
      const cachedProperties = this.checkForCached(this.properties);
      if (cachedProperties) {
        return resolve(cachedProperties);
      }

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

  public getProperty(id: string): Promise<IProperty | Array<IProperty>> {
    return new Promise((resolve, reject) => {
      const cachedProperty = this.checkForCached(this.properties, id);
      if (cachedProperty) {
        return resolve(cachedProperty);
      }

      this.httpService.get(`properties/${id}`).subscribe(
        (res: IHttpResponse) => {
          const property: IProperty = res.data.property;
          resolve(property);
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          reject('Not able to retrieve property at this time.');
        }
      );
    });
  }

  public getPostUpdateListener() {
    return this.propertyObservable.asObservable();
  }

  public clearCache() {
    this.properties = undefined;
  }

  private checkForCached(
    properties: Array<IProperty>,
    id?: string
  ): IProperty | Array<IProperty> {
    if (properties) {
      if (id) {
        return properties.find(property => property._id === id);
      } else {
        return properties;
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/api/http.service';
import { IProperty } from '../interfaces/IProperty';
import { IHttpErrorResponse } from 'src/app/core/api/interfaces/IHttpErrorResponse';
import { IHttpResponse } from 'src/app/core/api/interfaces/IHttpResponse';
import { Subject } from 'rxjs';
import { IPropertyPatch } from '../interfaces/IPropertyPatch';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private propertyObservable = new Subject<IProperty[]>();
  private properties: Array<IProperty>;

  constructor(private httpService: HttpService) {}

  private setPropertyData(property: IProperty | IPropertyPatch): FormData {
    const propertyForm = new FormData();
    propertyForm.append('name', property.name);
    propertyForm.append('monthlyRent', property.monthlyRent);
    propertyForm.append('image', property.image);

    return propertyForm;
  }

  public addProperty(
    property: IProperty
  ): Promise<{ msg: string; id?: string }> {
    const propertyData = this.setPropertyData(property);

    return new Promise((resolve, reject) => {
      this.httpService.post('properties', propertyData).subscribe(
        (res: IHttpResponse) => {
          const propertyResponse: IProperty = res.data.property;
          if (this.properties) {
            this.properties.push(propertyResponse);
          }
          this.propertyObservable.next(this.properties);
          resolve({
            msg: 'Property successfully added.',
            id: propertyResponse._id
          });
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
      const cachedProperties = this.checkForCachedMultiple(this.properties);
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

  public getProperty(id: string): Promise<IProperty> {
    return new Promise((resolve, reject) => {
      const cachedProperty = this.checkForCachedSingle(this.properties, id);
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
          reject(error);
        }
      );
    });
  }

  public updateProperty(property: IPropertyPatch, id: string) {
    return new Promise((resolve, reject) => {
      let propertyData: IPropertyPatch | FormData;
      if (typeof property.image === 'object') {
        propertyData = this.setPropertyData(property);
      } else {
        propertyData = property;

        this.httpService.put(`properties/${id}`, propertyData).subscribe(
          (res: IHttpResponse) => {
            this.properties = this._patchLocalProperty(res.data.property, id);
            this.propertyObservable.next([...this.properties]);
            resolve('Property successfully updated');
          },
          error => {
            console.log(error);
            reject('Unable to process at this time.');
          }
        );
      }
    });
  }

  private _patchLocalProperty(
    propertyRes: IProperty,
    id: string
  ): Array<IProperty> {
    const updatedProperties = [...this.properties];
    const oldPropertyIndex: number = updatedProperties.findIndex(
      p => p._id === id
    );
    const property = propertyRes;
    updatedProperties[oldPropertyIndex] = property;
    return updatedProperties;
  }

  public getPostUpdateListener() {
    return this.propertyObservable.asObservable();
  }

  public clearCache() {
    this.properties = undefined;
  }

  private checkForCachedSingle(
    properties: Array<IProperty>,
    id: string
  ): IProperty {
    if (properties) {
      if (id) {
        return properties.find(property => property._id === id);
      }
    }
  }

  private checkForCachedMultiple(
    properties: Array<IProperty>
  ): Array<IProperty> {
    if (properties) {
      return properties;
    }
  }
}

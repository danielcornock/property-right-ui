import { Injectable } from '@angular/core';
import { PropertyService } from '../../business/properties/services/property.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor(private propertyService: PropertyService) {}

  public clearCache() {
    this.propertyService.clearCache();
  }
}

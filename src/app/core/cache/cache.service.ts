import { Injectable } from '@angular/core';
import { PropertyService } from '../../properties/services/property.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor(private propertyService: PropertyService) {}

  public clearCache() {
    this.propertyService.clearCache();
  }
}

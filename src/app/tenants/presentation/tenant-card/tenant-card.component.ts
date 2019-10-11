import { Component, OnInit, Input } from '@angular/core';
import { ITenant } from '../../interfaces/ITenant';

@Component({
  selector: 'app-tenant-card',
  templateUrl: './tenant-card.component.html',
  styleUrls: ['./tenant-card.component.scss']
})
export class TenantCardComponent implements OnInit {
  @Input() tenantCardTenant: ITenant;

  public tenant: ITenant;
  public textColor: string;
  public bgColor: string;
  public lightestColor: string;
  public subtextColor: string;
  constructor() {}

  ngOnInit() {
    this.tenant = this.tenantCardTenant;
    this.textColor = this.tenant.avatar.textColor;
    this.bgColor = this.tenant.avatar.bgColor;
    this.lightestColor = this._replaceLightness(this.textColor, 97);
    this.subtextColor = this._replaceLightness(this.textColor, 35);
  }

  private _replaceLightness(hsl: string, newLightness: number) {
    const newStr: Array<string> = hsl.split('');
    newStr[newStr.length - 4] = newLightness + '';
    newStr.splice(newStr.length - 3, 1);
    return newStr.join('');
  }
}

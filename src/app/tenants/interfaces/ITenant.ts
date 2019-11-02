import { IProperty } from 'src/app/properties/interfaces/IProperty';

export interface ITenant {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  property: Partial<IProperty>;
  avatar?: IAvatar;
}

export interface IAvatar {
  initials: string;
  bgColor: string;
  textColor: string;
}

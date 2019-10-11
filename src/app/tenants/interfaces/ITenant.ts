export interface ITenant {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  propertyId?: string;
  propertyName?: string;
  avatar?: IAvatar;
}

export interface IAvatar {
  initials: string;
  bgColor: string;
  textColor: string;
}

export interface IProperty {
  _id?: string;
  name: string;
  monthlyRent: string;
  user?: string;
  town: string;
  country: string;
  url: string;
  image: File | string;
  todoCount?: number;
}

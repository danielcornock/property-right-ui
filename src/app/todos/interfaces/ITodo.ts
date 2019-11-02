import { IProperty } from 'src/app/properties/interfaces/IProperty';

export interface ITodo {
  _id: string;
  property: Partial<IProperty>;
  user: string;
  title: string;
  date?: Date;
  severity?: 'easy' | 'moderate' | 'severe';
  completed: boolean;
}

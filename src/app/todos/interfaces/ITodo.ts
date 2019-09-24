export interface ITodo {
  _id: string;
  propertyId?: string;
  propertyName?: string;
  user: string;
  title: string;
  due?: Date;
  severity?: 'easy' | 'moderate' | 'severe';
  completed: boolean;
}

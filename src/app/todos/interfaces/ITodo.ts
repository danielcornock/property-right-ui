export interface ITodo {
  _id: string;
  propertyId?: string;
  propertyName?: string;
  user: string;
  title: string;
  date?: Date;
  severity?: 'easy' | 'moderate' | 'severe';
  completed: boolean;
}

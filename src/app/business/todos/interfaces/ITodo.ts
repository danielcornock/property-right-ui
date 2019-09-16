export interface ITodo {
  property?: string;
  user: string;
  title: string;
  due?: Date;
  severity?: 'easy' | 'moderate' | 'severe';
  completed: boolean;
}

import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/api/http.service';
import { ITodo } from '../interfaces/ITodo';
import { IHttpResponse } from 'src/app/core/api/interfaces/IHttpResponse';
import { IHttpErrorResponse } from 'src/app/core/api/interfaces/IHttpErrorResponse';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private httpService: HttpService) {}

  public addTodo(todo: ITodo): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpService.post('todos', todo).subscribe(
        (res: IHttpResponse) => {
          const todoResponse: ITodo = res.data.todo;
          // TODO Add observable here - just figure out how to do it with todos first
          resolve('Property successfully added.');
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          reject("Something's gone wrong!");
        }
      );
    });
  }

  public getTodos(propertyId: string): Promise<Array<ITodo>> {
    return new Promise((resolve, reject) => {
      //! This is NOT GOOD - fix after getting MVP
      this.httpService.get(`todos/${propertyId}`).subscribe(
        (res: IHttpResponse) => {
          const todos: Array<ITodo> = res.data.todos;
          resolve(todos);
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          reject('Not able to fetch todos at this time.');
        }
      );
    });
  }
}

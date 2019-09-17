import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/api/http.service';
import { ITodo } from '../interfaces/ITodo';
import { IHttpResponse } from 'src/app/core/api/interfaces/IHttpResponse';
import { IHttpErrorResponse } from 'src/app/core/api/interfaces/IHttpErrorResponse';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoObservable = new Subject<ITodo>();
  public todoDeleteObservable = new Subject<string>();
  constructor(private httpService: HttpService) {}

  public addTodo(todo: ITodo): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpService.post('todos', todo).subscribe(
        (res: IHttpResponse) => {
          const todoResponse: ITodo = res.data.todo;
          this.todoObservable.next(todoResponse);
          resolve('Property successfully added.');
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          reject("Something's gone wrong!");
        }
      );
    });
  }

  public getTodos(propertyId?: string): Promise<Array<ITodo>> {
    return new Promise((resolve, reject) => {
      this.httpService.get(this.setTodoRoute(propertyId)).subscribe(
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

  public deleteTodo(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpService.delete(`todos/${id}`).subscribe(
        () => {
          this.todoDeleteObservable.next(id);
          resolve('Todo item successfully deleted.');
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          reject('Not able to delete todo at this time.');
        }
      );
    });
  }

  private setTodoRoute(propertyId: string) {
    if (propertyId) {
      return `properties/${propertyId}/todos`;
    } else {
      return 'todos';
    }
  }
}

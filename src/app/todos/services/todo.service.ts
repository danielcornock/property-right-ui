import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/api/http.service';
import { ITodo } from '../interfaces/ITodo';
import { IHttpResponse } from 'src/app/core/api/interfaces/IHttpResponse';
import { IHttpErrorResponse } from 'src/app/core/api/interfaces/IHttpErrorResponse';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/components/toast-messages/toast.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoObservable = new Subject<ITodo>();
  public todoDeleteObservable = new Subject<string>();
  constructor(private httpService: HttpService, private toast: ToastService) {}

  public addTodo(todo: ITodo): void {
    this.httpService.post('todos', todo).subscribe(
      (res: IHttpResponse) => {
        const todoResponse: ITodo = res.data.todo;
        this.todoObservable.next(todoResponse);
        this.toast.success('Todo item successfully added.');
      },
      (error: IHttpErrorResponse) => {
        console.log(error);
        this.toast.error("Something's gone wrong!");
      }
    );
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
          this.toast.error('Not able to fetch todos at this time!');
          reject();
        }
      );
    });
  }

  public deleteTodo(id: string): void {
    this.httpService.delete(`todos/${id}`).subscribe(
      () => {
        this.todoDeleteObservable.next(id);
        this.toast.success('Todo item successfully deleted.');
      },
      (error: IHttpErrorResponse) => {
        console.log(error);
        this.toast.error('Not able to delete todo at this time.');
      }
    );
  }

  private setTodoRoute(propertyId: string) {
    if (propertyId) {
      return `properties/${propertyId}/todos`;
    } else {
      return 'todos';
    }
  }
}

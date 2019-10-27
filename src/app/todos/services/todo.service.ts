import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/components/toast-messages/toast.service';
import { HttpService } from 'src/app/core/api/http.service';
import { IHttpErrorResponse } from 'src/app/core/api/interfaces/IHttpErrorResponse';
import { IHttpResponse } from 'src/app/core/api/interfaces/IHttpResponse';
import { ITodo } from '../interfaces/ITodo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoObservable = new Subject<ITodo>();
  public todoRefresh: Subject<void> = new Subject<void>();

  constructor(private httpService: HttpService, private toast: ToastService) {}

  public addTodo(todo: ITodo): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpService.post('todos', todo).subscribe(
        (res: IHttpResponse) => {
          const todoResponse: ITodo = res.data.todo;
          console.log(todoResponse.date);
          this.todoObservable.next(todoResponse);
          this.toast.success('Todo item successfully added.');
          resolve();
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error("Something's gone wrong!");
          reject();
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
          this.toast.error('Not able to fetch todos at this time!');
          reject();
        }
      );
    });
  }

  public getTodo(todoId: string): Promise<ITodo> {
    return new Promise((resolve, reject) => {
      this.httpService.get(`todos/${todoId}`).subscribe(
        (res: IHttpResponse) => {
          const todo: ITodo = res.data.todo;
          resolve(todo);
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error('Not able to fetch todo at this time!');
          reject();
        }
      );
    });
  }

  public deleteTodo(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpService.delete(`todos/${id}`).subscribe(
        () => {
          this.toast.success('Todo item successfully deleted.');
          resolve();
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error('Not able to delete todo at this time.');
          reject();
        }
      );
    });
  }

  public updateTodo(todo: Partial<ITodo>, todoId: string) {
    return new Promise((resolve, reject) => {
      this.httpService.put(`todos/${todoId}`, todo).subscribe(
        (res: IHttpResponse) => {
          const updatedTodo = res.data.todo;
          resolve();
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error('Not able to update todo at this time.');
          reject();
        }
      );
    });
  }

  public toggleTodoCompletion(id: string, status: boolean): Promise<null> {
    const newStatus = { completed: status };
    return new Promise((resolve, reject) => {
      this.httpService.put(`todos/${id}`, newStatus).subscribe(
        (res: IHttpResponse) => {
          const todoRes = res.data.todo;
          resolve();
        },
        error => {
          console.log(error);
          reject();
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

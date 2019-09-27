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
  public todoDeleteObservable = new Subject<string>();
  public todoUpdateObservable = new Subject<ITodo>();

  constructor(private httpService: HttpService, private toast: ToastService) {
  }

  public addTodo(todo: ITodo): void {
    this.httpService.post('todos', todo).subscribe(
      (res: IHttpResponse) => {
        const todoResponse: ITodo = res.data.todo;
        this.todoObservable.next(todoResponse);
        this.toast.success('Todo item successfully added.');
      },
      (error: IHttpErrorResponse) => {
        console.log(error);
        this.toast.error('Something\'s gone wrong!');
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

  public deleteTodo(id: string): void | IHttpErrorResponse {
    this.httpService.delete(`todos/${ id }`).subscribe(
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

  public toggleTodoCompletion(id: string, status: boolean): Promise<ITodo | null> {
    const newStatus = { completed: status };
    return new Promise((resolve, reject) => {
      this.httpService.put(`todos/${ id }`, newStatus)
        .subscribe((res: IHttpResponse) => {
          const todoRes = res.data.todo;
          resolve(todoRes);
        }, error => {
          console.log(error);
          reject();
        });
    });
  }

  private setTodoRoute(propertyId: string) {
    if (propertyId) {
      return `properties/${ propertyId }/todos`;
    } else {
      return 'todos';
    }
  }
}

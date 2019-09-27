import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITodo } from '../interfaces/ITodo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  @Input()
  propertyId: string = '';

  public todos: Array<ITodo>;

  private todoSub: Subscription;
  private todoDeleteSub: Subscription;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.fetchTodos();
    this.observeNewTodos();
    this.observeDeletedTodos();
  }

  public deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  public toggleCompleted(todo: ITodo): void {
    const newStatus = !todo.completed;
    this.todoService.toggleTodoCompletion(todo._id, newStatus)
      .then((res: ITodo) => {
        this.todos = this._patchLocalTodos(newStatus, todo._id);
      });
  }

  ngOnDestroy() {
    this.todoSub.unsubscribe();
    this.todoDeleteSub.unsubscribe();
  }

  private fetchTodos(): void {
    this.todoService
      .getTodos(this.propertyId)
      .then((todos: Array<ITodo>) => {
        this.todos = todos;
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  private observeNewTodos(): void {
    this.todoSub = this.todoService.todoObservable.subscribe((todo: ITodo) => {
      this.todos.push(todo);
    });
  }

  private observeDeletedTodos(): void {
    this.todoDeleteSub = this.todoService.todoDeleteObservable.subscribe(
      (todoId: string) => {
        this.todos = this.todos.filter(todo => todo._id !== todoId);
      }
    );
  }

  private _patchLocalTodos(newState, id) {
    const updatedTodos = [...this.todos];
    const oldTodoIndex: number = updatedTodos.findIndex(t => t._id === id);
    updatedTodos[oldTodoIndex].completed = newState;

    return updatedTodos;

  }
}

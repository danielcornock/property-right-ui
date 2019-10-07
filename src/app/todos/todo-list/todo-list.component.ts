import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITodo } from '../interfaces/ITodo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  propertyId: string = '';

  @Input() todoListFilteredTodos: Array<ITodo>;

  public todos: Array<ITodo>;
  public showCompleted: boolean = false;
  public isLoading: boolean;

  private todoSub: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.isLoading = true;
    this.fetchTodos();
    this.observeNewTodos();
  }

  ngOnChanges() {
    if (this.todoListFilteredTodos) {
      this.todos = this.todoListFilteredTodos;
    }
  }

  public getActiveTodos() {
    if (this.todos) {
      return this.todos.filter(todo => todo.completed === false);
    }
  }

  public getCompletedTodos() {
    if (this.todos && this.showCompleted === true) {
      return this.todos.filter(todo => todo.completed === true);
    }
  }

  public deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).then(() => {
      this._deleteLocalTodos(id);
    });
  }

  public toggleCompleted(todo: ITodo): void {
    const newStatus = !todo.completed;
    this.todoService.toggleTodoCompletion(todo._id, newStatus).then(() => {
      this.todos = this._patchLocalTodos(newStatus, todo._id);
    });
  }

  ngOnDestroy() {
    this.todoSub.unsubscribe();
  }

  public setShowCompleted() {
    this.showCompleted = true;
  }

  private fetchTodos(): void {
    this.todoService
      .getTodos(this.propertyId)
      .then((todos: Array<ITodo>) => {
        this.todos = todos;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
      });
  }

  private observeNewTodos(): void {
    this.todoSub = this.todoService.todoObservable.subscribe((todo: ITodo) => {
      this.todos.push(todo);
    });
  }

  private _deleteLocalTodos(todoId: string): void {
    this.todos = this.todos.filter(todo => todo._id !== todoId);
  }

  private _patchLocalTodos(newState, id) {
    const updatedTodos = [...this.todos];
    const oldTodoIndex: number = updatedTodos.findIndex(t => t._id === id);
    updatedTodos[oldTodoIndex].completed = newState;

    return updatedTodos;
  }
}

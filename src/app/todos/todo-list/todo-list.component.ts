import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../interfaces/ITodo';
import { Subscription } from 'rxjs';

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

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
    this.observeNewTodos();
    this.observeDeletedTodos();
  }

  public deleteTodo(id: string): void {
    this.todoService
      .deleteTodo(id)
      .then((msg: string) => {
        console.log(msg);
      })
      .catch((err: string) => {
        console.log(err);
      });
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

  ngOnDestroy() {
    this.todoSub.unsubscribe();
    this.todoDeleteSub.unsubscribe();
  }
}

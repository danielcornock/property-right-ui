import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/business/todos/interfaces/ITodo';
import { TodoService } from 'src/app/business/todos/services/todo.service';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss']
})
export class TodosPageComponent implements OnInit {
  public todos: Array<ITodo>;
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getAllTodos();
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

  private getAllTodos(): void {
    this.todoService
      .getTodos('')
      .then((todos: Array<ITodo>) => {
        this.todos = todos;
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
}

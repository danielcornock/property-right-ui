import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../interfaces/ITodo';
import { TodoService } from '../../services/todo.service';

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

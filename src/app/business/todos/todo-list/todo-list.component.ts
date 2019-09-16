import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../interfaces/ITodo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todos: Array<ITodo>;
  @Input() propertyId: string;
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService
      .getTodos(this.propertyId)
      .then((todos: Array<ITodo>) => {
        this.todos = todos;
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
}

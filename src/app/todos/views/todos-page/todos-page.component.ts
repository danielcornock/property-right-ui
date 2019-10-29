import { Component, OnInit, ViewChild } from '@angular/core';
import { ITodo } from '../../interfaces/ITodo';
import { TodoService } from '../../services/todo.service';
import { ModalService } from 'src/app/core/modal/modal.service';
import { TodoCreateComponent } from '../../todo-create/todo-create.component';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss']
})
export class TodosPageComponent implements OnInit {
  public todos: Array<ITodo>;
  public filteredTodos: Array<ITodo>;
  public searchFocus: boolean = false;

  constructor(
    private todoService: TodoService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getAllTodos();
  }

  private getAllTodos(): void {
    this.todoService
      .getTodos('')
      .then((todos: Array<ITodo>) => {
        this.todos = todos;
        this.filteredTodos = todos;
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  public openCreateTodoModal(): void {
    this.modalService.openModal(TodoCreateComponent, {});
  }

  public searchTodos(query: string) {
    const filteredTodos = this.todos.filter(todo => {
      if (
        todo.title.toLowerCase().includes(query) ||
        (todo.propertyName && todo.propertyName.toLowerCase().includes(query))
      ) {
        return true;
      }
    });
    this.filteredTodos = filteredTodos;
  }
}

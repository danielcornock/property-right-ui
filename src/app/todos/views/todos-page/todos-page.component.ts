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
  @ViewChild('searchBar', { static: true }) searchBar;

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
    this.modalService.openModal(TodoCreateComponent);
  }

  public setSearchFocus(active: boolean) {
    this.searchFocus = active;
  }

  public searchTodos(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchBar.nativeElement.value = '';
      this.searchBar.nativeElement.blur();
    }
    console.log(event.target.value);
    const filteredTodos = this.todos.filter(todo => {
      if (
        todo.title
          .toLowerCase()
          .includes((event.target as HTMLInputElement).value.toLowerCase()) ||
        (todo.propertyName &&
          todo.propertyName
            .toLowerCase()
            .includes((event.target as HTMLInputElement).value.toLowerCase()))
      ) {
        return true;
      }
    });
    this.filteredTodos = filteredTodos;
  }
}

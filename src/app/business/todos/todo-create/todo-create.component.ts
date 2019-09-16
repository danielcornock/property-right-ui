import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {
  @Input() propertyId: string;
  todoForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: '',
      severity: ''
    });
  }

  submitTodo(): void {
    if (this.todoForm.invalid) {
      return console.error('You need to add a title!');
    }
    this.todoForm.value.property = this.propertyId;
    console.log(this.todoForm.value);
    this.todoService
      .addTodo(this.todoForm.value)
      .then(msg => {
        console.log(msg);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

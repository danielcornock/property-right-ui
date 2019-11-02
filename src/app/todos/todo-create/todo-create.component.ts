import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { PropertyService } from '../../properties/services/property.service';
import { IProperty } from '../../properties/interfaces/IProperty';
import { IPropertyDropdownOption } from './interfaces/IPropertyDropdownOption';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITodo } from '../interfaces/ITodo';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {
  public propertyId: string;
  public todoForm: FormGroup;
  public propertyOptions: Array<IPropertyDropdownOption> = [];
  public isLoading: boolean;

  private todo: ITodo;
  private todoId: string;
  private editMode: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private propertyService: PropertyService,
    private matDialogRef: MatDialogRef<TodoCreateComponent>
  ) {
    if (data.data) {
      if (data.data.propertyId) {
        this.propertyId = data.data.propertyId;
      }
      if (data.data.todoId) {
        this.todoId = data.data.todoId;
      }
    }
  }

  ngOnInit() {
    this.isLoading = false;
    this.todoForm = this._initialiseTodoForm();
    this.setPropertyDropdownOptions();
    if (this.todoId) {
      this.editMode = true;
      this._populateFields();
    }
  }

  public submitTodo(): void {
    if (this.todoForm.invalid) {
      return console.error('You need to add a title!');
    }
    this.isLoading = true;
    if (this.editMode) {
      return this._updateTodo();
    }
    if (this.propertyId) {
      this.todoForm.value.propertyId = this.propertyId;
    }
    this.todoService
      .addTodo(this.todoForm.value)
      .then(() => {
        this.todoForm.reset();
        this.matDialogRef.close();
        this.todoForm = this._initialiseTodoForm();
      })
      .catch(err => {
        this.isLoading = false;
      });
  }

  public closeModal() {
    this.matDialogRef.close();
  }

  private _updateTodo() {
    this.todoService.updateTodo(this.todoForm.value, this.todoId).then(() => {
      this.todoService.todoRefresh.next();
      this.matDialogRef.close(true);
    });
  }

  private _populateFields() {
    this.todoService.getTodo(this.todoId).then(todo => {
      this.todo = todo;
      let modifiedDate: string = '';
      if (this.todo.date) {
        modifiedDate = this.todo.date.toString().slice(0, 10);
      }
      this.todoForm.setValue({
        title: this.todo.title,
        date: modifiedDate,
        propertyId: this.todo.propertyId,
        severity: this.todo.severity
      });
    });
  }

  private setPropertyDropdownOptions(): void {
    this.propertyService
      .getAllProperties()
      .then((propertiesResponse: Array<IProperty>) => {
        this.propertyOptions = propertiesResponse.map(property => {
          return {
            name: property.name,
            id: property._id
          };
        });
      });
  }

  private _initialiseTodoForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      date: '',
      severity: '',
      propertyId: null
    });
  }
}

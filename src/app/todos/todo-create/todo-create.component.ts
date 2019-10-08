import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { PropertyService } from '../../properties/services/property.service';
import { IProperty } from '../../properties/interfaces/IProperty';
import { IPropertyDropdownOption } from './interfaces/IPropertyDropdownOption';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {
  public propertyId: string;
  public todoForm: FormGroup;
  public propertyOptions: Array<IPropertyDropdownOption> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private propertyService: PropertyService,
    private matDialogRef: MatDialogRef<TodoCreateComponent>
  ) {
    if (data.data && data.data.propertyId) {
      this.propertyId = data.data.propertyId;
    }
  }

  ngOnInit() {
    this.todoForm = this._initialiseTodoForm();
    this.setPropertyDropdownOptions();
  }

  public submitTodo(): void {
    if (this.todoForm.invalid) {
      return console.error('You need to add a title!');
    }
    if (this.propertyId) {
      this.todoForm.value.propertyId = this.propertyId;
    }
    this.todoService.addTodo(this.todoForm.value).then(() => {
      this.todoForm.reset();
      this.matDialogRef.close();
      this.todoForm = this._initialiseTodoForm();
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

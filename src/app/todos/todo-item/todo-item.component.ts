import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { ITodo } from '../interfaces/ITodo';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  public todo: ITodo;
  @Input() todoInput: ITodo;
  @Input() propertyId: string;
  constructor() {}

  @Output() deleteTodo = new EventEmitter();
  @Output() toggleCompleted = new EventEmitter();

  ngOnInit() {
    this.todo = this.todoInput;
  }

  public emitDeleteTodo(): void {
    this.deleteTodo.emit(this.todo._id);
  }
  public emitToggleCompleted(): void {
    this.toggleCompleted.emit(this.todo);
  }
}

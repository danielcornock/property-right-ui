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
  public contextMenuConfig: object;
  @Input() todoInput: ITodo;
  @Input() propertyId: string;
  constructor() {}

  @Output() deleteTodo = new EventEmitter();
  @Output() toggleCompleted = new EventEmitter();

  ngOnInit() {
    this.todo = this.todoInput;
    this.contextMenuConfig = this._createContextMenuConfig();
  }

  public onActionSelect(event) {
    eval(event);
  }

  public emitDeleteTodo(): void {
    this.deleteTodo.emit(this.todo._id);
  }
  public emitToggleCompleted(): void {
    this.toggleCompleted.emit(this.todo);
  }

  public formatDate(): string {
    const date = new Date(this.todoInput.date);
    return date.toLocaleString('en-gb', {
      month: 'short',
      day: 'numeric'
    });
  }

  public daysLeft(): string {
    const dateDue = new Date(this.todo.date).getTime();
    const today = Date.now();
    const difference = Math.floor((dateDue - today) / (1000 * 3600 * 24));
    return difference < -1
      ? 'overdue'
      : difference === -1
      ? 'today'
      : difference === 0
      ? 'tomorrow'
      : `${difference + 1} days`;
  }

  private _createContextMenuConfig(): object {
    return {
      position: {
        x: 'before',
        y: 'below'
      },
      items: [
        {
          label: 'Delete',
          action: 'this.emitDeleteTodo()'
        },
        {
          label: 'Edit',
          action: 'console.log(this)'
        }
      ]
    };
  }
}

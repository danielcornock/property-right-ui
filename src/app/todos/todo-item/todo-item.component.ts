import { Component, OnInit, Input, Output, HostListener } from '@angular/core';
import { ITodo } from '../interfaces/ITodo';
import { EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/core/modal/modal.service';
import { TodoCreateComponent } from '../todo-create/todo-create.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  public todo: ITodo;
  public contextMenuConfig: object;
  public showMeta;
  public hasMeta: boolean = false;
  @Input() todoInput: ITodo;
  @Input() propertyId: string;
  constructor(private modalService: ModalService) {}

  @Output() deleteTodo = new EventEmitter();
  @Output() toggleCompleted = new EventEmitter();

  @HostListener('mouseenter') mouseover(event: Event) {
    this.showMeta = true;
  }
  @HostListener('mouseleave') mouseleave(event: Event) {
    this.showMeta = false;
  }

  ngOnInit() {
    this.todo = this.todoInput;
    this.contextMenuConfig = this._createContextMenuConfig();
    this.showMeta = false;
    this.hasMeta =
      (this.todo.propertyName && !this.propertyId) || this.todo.date
        ? true
        : false;
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

  public getDaysLeftColor(): string {
    return this.daysLeft() < 0
      ? 'severe'
      : this.daysLeft() == 0
      ? 'moderate'
      : null;
  }

  public formatDate(): string {
    const date = new Date(this.todoInput.date);
    return date.toLocaleString('en-gb', {
      month: 'short',
      day: 'numeric'
    });
  }

  private editTodo(): void {
    this.modalService.openModal(TodoCreateComponent, {
      todoId: this.todo._id
    });
  }

  private daysLeft(): number {
    const dateDue = new Date(this.todo.date).getTime();
    const today = Date.now();
    return Math.floor((dateDue - today) / (1000 * 3600 * 24));
  }

  public daysLeftToString(): string {
    return this.daysLeft() < -1
      ? 'overdue'
      : this.daysLeft() === -1
      ? 'today'
      : this.daysLeft() === 0
      ? 'tomorrow'
      : `${this.daysLeft() + 1} days`;
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
          action: 'this.editTodo()'
        }
      ]
    };
  }
}

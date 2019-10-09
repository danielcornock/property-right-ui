import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @Input()
  public contextMenuConfig;

  @Output()
  public contextMenuOnSelect: EventEmitter<string> = new EventEmitter<string>();

  public contextItems: object;
  public yPosition: string = 'below';
  public xPosition: string = 'before';

  constructor() {}

  ngOnInit() {
    this.contextItems = this.contextMenuConfig.items;
    this._setPosition(this.contextMenuConfig.position);
  }

  public onSelect(event): void {
    this.contextMenuOnSelect.emit(event);
  }

  private _setPosition(position) {
    if (position.x) this.xPosition = position.x;
    if (position.y) this.yPosition = position.y;
  }
}

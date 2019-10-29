import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  public searchFocus: boolean;
  @ViewChild('searchBar', { static: true }) searchBar;

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.searchFocus = false;
  }

  public setSearchFocus(active: boolean) {
    this.searchFocus = active;
  }

  public onKeyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchBar.nativeElement.value = '';
      this.searchBar.nativeElement.blur();
      return;
    }

    this.onSearch.emit((event.target as HTMLInputElement).value.toLowerCase());
  }
}

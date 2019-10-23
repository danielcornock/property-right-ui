import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from 'src/app/properties/services/property.service';
import { IProperty } from 'src/app/properties/interfaces/IProperty';
import { TodoService } from 'src/app/todos/services/todo.service';
import { ITodoCount } from '../../interfaces/ITodoCount';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  public searchFocus: boolean = false;
  public pageTitle: string = 'Your Properties';
  public isLoading: boolean;
  public filteredProperties: Array<IProperty>;
  public properties: Array<IProperty>;
  private propertiesTodos;
  private propertiesSub: Subscription;
  constructor(
    private propertyService: PropertyService,
    private todoService: TodoService
  ) {}
  @ViewChild('searchBar', { static: true }) searchBar;

  ngOnInit() {
    this.isLoading = true;

    this.propertyService
      .getAllProperties()
      .then(results => {
        this.properties = results;
        this.filteredProperties = this.properties;
        console.log(this.properties);
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
      });

    this.propertiesSub = this.propertyService
      .getPostUpdateListener()
      .subscribe((properties: Array<IProperty>) => {
        this.properties = properties;
      });
  }

  ngOnDestroy() {
    this.propertiesSub.unsubscribe();
  }

  public setSearchFocus(active: boolean) {
    this.searchFocus = active;
  }

  public searchProperties(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchBar.nativeElement.value = '';
      this.searchBar.nativeElement.blur();
    }
    const filteredProps = this.properties.filter(property => {
      return property.name
        .toLowerCase()
        .includes((event.target as HTMLInputElement).value.toLowerCase());
    });

    this.filteredProperties = filteredProps;
  }
}

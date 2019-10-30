import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySummaryViewComponent } from './property-summary-view.component';

describe('PropertySummaryComponent', () => {
  let component: PropertySummaryViewComponent;
  let fixture: ComponentFixture<PropertySummaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertySummaryViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

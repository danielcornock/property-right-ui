import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPillComponent } from './ui-pill.component';

describe('UiPillComponent', () => {
  let component: UiPillComponent;
  let fixture: ComponentFixture<UiPillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantCardComponent } from './tenant-card.component';

describe('TenantCardComponent', () => {
  let component: TenantCardComponent;
  let fixture: ComponentFixture<TenantCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

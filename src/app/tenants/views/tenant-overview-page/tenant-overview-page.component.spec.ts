import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantOverviewPageComponent } from './tenant-overview-page.component';

describe('TenantOverviewPageComponent', () => {
  let component: TenantOverviewPageComponent;
  let fixture: ComponentFixture<TenantOverviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantOverviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

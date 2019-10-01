import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsPageComponent } from './tenants-page.component';

describe('TenantsPageComponent', () => {
  let component: TenantsPageComponent;
  let fixture: ComponentFixture<TenantsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

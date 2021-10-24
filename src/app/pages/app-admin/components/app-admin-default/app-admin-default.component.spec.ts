import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminDefaultComponent } from './app-admin-default.component';

describe('AppAdminDefaultComponent', () => {
  let component: AppAdminDefaultComponent;
  let fixture: ComponentFixture<AppAdminDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAdminDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAdminDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoleEditComponent } from './app-role-edit.component';

describe('AppRoleEditComponent', () => {
  let component: AppRoleEditComponent;
  let fixture: ComponentFixture<AppRoleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRoleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

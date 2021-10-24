import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoleViewComponent } from './app-role-view.component';

describe('AppRoleViewComponent', () => {
  let component: AppRoleViewComponent;
  let fixture: ComponentFixture<AppRoleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRoleViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRoleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

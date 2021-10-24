import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavigationEditComponent } from './app-navigation-edit.component';

describe('AppNavigationEditComponent', () => {
  let component: AppNavigationEditComponent;
  let fixture: ComponentFixture<AppNavigationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppNavigationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavigationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

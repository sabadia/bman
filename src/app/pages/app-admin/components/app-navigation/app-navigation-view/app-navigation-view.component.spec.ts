import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavigationViewComponent } from './app-navigation-view.component';

describe('AppNavigationViewComponent', () => {
  let component: AppNavigationViewComponent;
  let fixture: ComponentFixture<AppNavigationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppNavigationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavigationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

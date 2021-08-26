import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseNavigationToolbarComponent } from './base-navigation-toolbar.component';

describe('BaseNavigationToolbarComponent', () => {
  let component: BaseNavigationToolbarComponent;
  let fixture: ComponentFixture<BaseNavigationToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseNavigationToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseNavigationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

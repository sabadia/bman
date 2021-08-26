import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAuthFailedDefaultComponent } from './base-auth-failed-default.component';

describe('BaseAuthFailedDefaultComponent', () => {
  let component: BaseAuthFailedDefaultComponent;
  let fixture: ComponentFixture<BaseAuthFailedDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAuthFailedDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAuthFailedDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

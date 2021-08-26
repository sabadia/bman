import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAuthorizationDefaultComponent } from './base-authorization-default.component';

describe('BaseAuthorizationDefaultComponent', () => {
  let component: BaseAuthorizationDefaultComponent;
  let fixture: ComponentFixture<BaseAuthorizationDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAuthorizationDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAuthorizationDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

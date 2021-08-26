import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAuthorizationLoginComponent } from './base-authorization-login.component';

describe('BaseAuthorizationLoginComponent', () => {
  let component: BaseAuthorizationLoginComponent;
  let fixture: ComponentFixture<BaseAuthorizationLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAuthorizationLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAuthorizationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAuthorizationRegisterComponent } from './base-authorization-register.component';

describe('BaseAuthorizationRegisterComponent', () => {
  let component: BaseAuthorizationRegisterComponent;
  let fixture: ComponentFixture<BaseAuthorizationRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAuthorizationRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAuthorizationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

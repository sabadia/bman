import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAccountActivationComponent } from './base-account-activation.component';

describe('BaseAccountActivationComponent', () => {
  let component: BaseAccountActivationComponent;
  let fixture: ComponentFixture<BaseAccountActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAccountActivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAccountActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

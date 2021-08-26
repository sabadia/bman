import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseNotFoundDefaultComponent } from './base-not-found-default.component';

describe('BaseNotFoundDefaultComponent', () => {
  let component: BaseNotFoundDefaultComponent;
  let fixture: ComponentFixture<BaseNotFoundDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseNotFoundDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseNotFoundDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

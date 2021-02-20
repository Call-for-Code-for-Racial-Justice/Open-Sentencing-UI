import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmbraceComponent } from './embrace.component';

describe('EmbraceComponent', () => {
  let component: EmbraceComponent;
  let fixture: ComponentFixture<EmbraceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

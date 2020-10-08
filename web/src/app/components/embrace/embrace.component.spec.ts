import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbraceComponent } from './embrace.component';

describe('EmbraceComponent', () => {
  let component: EmbraceComponent;
  let fixture: ComponentFixture<EmbraceComponent>;

  beforeEach(async(() => {
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

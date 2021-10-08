import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbraceHomeComponent } from './embrace-home.component';

describe('EmbraceHomeComponent', () => {
  let component: EmbraceHomeComponent;
  let fixture: ComponentFixture<EmbraceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbraceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbraceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { UIShellModule } from 'carbon-components-angular/ui-shell/ui-shell.module';

import { EmbraceHomeComponent } from './embrace-home.component';

describe('EmbraceHomeComponent', () => {
  let component: EmbraceHomeComponent;
  let fixture: ComponentFixture<EmbraceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[UIShellModule],
      declarations: [ EmbraceHomeComponent ],
      schemas: [NO_ERRORS_SCHEMA]

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

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestCarbonComponentsAngularModule } from 'src/test-carbon-components-angular.module';

import { EmbraceComponent } from './embrace.component';

describe('EmbraceComponent', () => {
  let component: EmbraceComponent;
  let fixture: ComponentFixture<EmbraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestCarbonComponentsAngularModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule],
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

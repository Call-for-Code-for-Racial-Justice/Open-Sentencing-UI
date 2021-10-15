import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCarbonComponentsAngularModule } from 'src/test-carbon-components-angular.module';

import { CaseComponent } from './cases.component';

describe('EmbraceComponent', () => {
  let component: CaseComponent;
  let fixture: ComponentFixture<CaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestCarbonComponentsAngularModule],
      declarations: [ CaseComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

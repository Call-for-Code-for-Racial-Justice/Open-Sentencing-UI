import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '@carbon/icons-angular';

import { TestCarbonComponentsAngularModule } from 'src/test-carbon-components-angular.module';

import { LogoutComponent } from './logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }
];


describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), TestCarbonComponentsAngularModule],
      declarations: [ LogoutComponent, LoginComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    router = TestBed.get(Router);
    router.initialNavigation();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

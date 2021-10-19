import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UIShellModule } from 'carbon-components-angular/ui-shell/ui-shell.module';
import { EmbraceHomeComponent } from './components/embrace/embrace-home/embrace-home.component';
import { EmbraceComponent } from './components/embrace/embrace.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        UIShellModule
            ],
      declarations: [
        AppComponent,
        HeaderComponent,
        EmbraceHomeComponent,
        EmbraceComponent,
        
      ],
      schemas: [NO_ERRORS_SCHEMA]

    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});

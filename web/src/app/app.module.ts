import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import {
  ButtonModule,
  GridModule,
  InputModule,
  SelectModule,
  StructuredListModule,
  TableModule,
  RadioModule,
  BreadcrumbModule,
  DatePickerModule,
  AccordionModule,
  PaginationModule,
  ModalModule,
  TagModule,
  LinkModule,
  ComboBoxModule,
  ContentSwitcherModule,
  DocumentationModule,
  SearchModule,
  PlaceholderModule,
  DialogModule,
  UIShellModule,
  ProgressIndicatorModule,
  
} from 'carbon-components-angular';

import { SettingsModule, DeleteModule, SaveModule, DownloadModule, AddModule, DocumentModule, IdeaModule, ReportDataModule, FolderAddModule
} from '@carbon/icons-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthenticatedUserGuard } from './guards/authenticate-user.guard';
import { EmbraceComponent } from './components/embrace/embrace.component';
import { CaseComponent } from './components/cases/cases.component';
import { ModalComponent } from './components/modal/modal.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { EmbraceHomeComponent } from './components/embrace/embrace-home/embrace-home.component';

export function tokenGetter() {
  return localStorage.getItem('user_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent,
    EmbraceComponent,
    CaseComponent,
    ModalComponent,
    AuthCallbackComponent,
    EmbraceHomeComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
    FormsModule,
    ButtonModule,
    GridModule,
    InputModule,
    SelectModule,
    StructuredListModule,
    TableModule,
    UIShellModule,
    RadioModule,
    PaginationModule,
    BreadcrumbModule,
    ModalModule,
    DatePickerModule,
    AccordionModule,
    UIShellModule,
    PlaceholderModule,
    PaginationModule,
    ComboBoxModule,
    DocumentationModule,
    SearchModule,
    ContentSwitcherModule,
    DialogModule,
    LinkModule,
    TagModule,
    ProgressIndicatorModule,
    SettingsModule,
    DeleteModule,
    SaveModule,
    DownloadModule,
    AddModule,
    DocumentModule,
    IdeaModule,
    ReportDataModule,
    FolderAddModule

    
    
  ],
  entryComponents: [ModalComponent],
  providers: [AuthenticatedUserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

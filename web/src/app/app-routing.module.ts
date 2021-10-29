import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthenticatedUserGuard } from './guards/authenticate-user.guard';
import { EmbraceComponent } from './components/embrace/embrace.component';
import { CaseComponent } from './components/cases/cases.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { EmbraceHomeComponent } from './components/embrace/embrace-home/embrace-home.component';


const routes: Routes = [
  {
    path: 'cases', component: CaseComponent,
  canActivate: [AuthenticatedUserGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'embrace', component: EmbraceHomeComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: '', redirectTo: 'cases', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: CaseComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

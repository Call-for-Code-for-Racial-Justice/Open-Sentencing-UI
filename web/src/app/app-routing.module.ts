import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
// import { AuthenticatedUserGuard } from './guards/authenticate-user.guard';
import { EmbraceComponent } from './components/embrace/embrace.component';
import { CaseComponent } from './components/cases/cases.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthenticatedUserGuard],
    children: [
      { path: '', redirectTo: 'cases', pathMatch: 'full' },
      { path: 'cases', component: CaseComponent },
      { path: 'embrace', component: EmbraceComponent },
      { path: '**', redirectTo: 'cbc', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

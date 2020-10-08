import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnRoute: string;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.returnRoute = this.route.snapshot.queryParams.returnRoute;
  }

  login() {
    this.redirectToLogin();
  }

  redirectToLogin() {
    let logInRedirectRoute = `${environment.defaultUIPath}/api/loginWithRedirect?returnRequestURL=/home`;

    if (this.returnRoute) {
      logInRedirectRoute += '&appReturnRoute=' + this.returnRoute;
    }
    this.loginService.loginWithRedirect(logInRedirectRoute);
  }

}

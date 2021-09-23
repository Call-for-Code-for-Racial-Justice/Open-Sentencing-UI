import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
//import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationService } from '../../services/appid-authentication.service';
import { GridModule } from 'carbon-components-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnRoute: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.ngOnInit();
    this.returnRoute = this.route.snapshot.queryParams.returnRoute;
  }

 login() {
    if (this.returnRoute) {
      this.authService.setOriginalUrl(this.returnRoute);
    }
    this.authService.startAuthentication();
  }

  signup() {
    const signupUrl = 'https://www.ibm.com/account/us-en/signup/register.html';
    window.location.replace(signupUrl);
  }
}
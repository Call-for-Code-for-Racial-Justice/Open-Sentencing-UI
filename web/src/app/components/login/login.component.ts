import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnRoute: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.returnRoute = this.route.snapshot.queryParams.returnRoute;
  }

  login() {
    if (this.returnRoute) {
      this.authService.setOriginalUrl(this.returnRoute);
    }

    this.authService.startAuthentication();
  }
}

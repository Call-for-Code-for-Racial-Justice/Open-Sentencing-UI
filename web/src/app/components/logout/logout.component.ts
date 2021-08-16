import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/appid-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const returnRoute: string = this.route.snapshot.queryParams.returnRoute;

    if (returnRoute === '/login') {
      return;
    }

    this.authenticationService.clearTokenForProfile();

    const queryParams: any = {};

    if (returnRoute) {
      queryParams.returnRoute = returnRoute;
    }

    // tslint:disable-next-line:object-literal-shorthand
    this.router.navigateByUrl('/login', { queryParams: queryParams });
  }

}

import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentChecked  {
  appReturnRoute: string;
  userToken;
  userLoggedIn = false;
  subscription: Subscription;
  user: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscription = this.authenticationService
      .getLoggedInStatus()
      .subscribe(isLoggedIn => {
        this.userLoggedIn = isLoggedIn;
      });
    this.appReturnRoute = this.route.snapshot.queryParams.appReturnRoute;
    this.userToken = this.authenticationService.getTokenForProfile();
    if (null === this.userToken) {
      this.authenticationService.startAuthentication().then(async () => {
        this.userToken = this.authenticationService.getTokenForProfile();
        if (!this.userToken) {
          return;
        }
        this.user = `${this.userToken.user.firstName} ${this.userToken.user.lastName}`;
        if (this.appReturnRoute) {
          this.router.navigateByUrl(this.appReturnRoute);
        } else {
          this.router.navigateByUrl('/home');
        }
      });
    } else {
      this.user = `${this.userToken.user.firstName} ${this.userToken.user.lastName}`;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}

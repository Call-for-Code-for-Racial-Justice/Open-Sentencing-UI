import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/appid-authentication.service';

@Injectable()
export class AuthenticatedUserGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    public jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (null !== this.authenticationService.getTokenForProfile()) {
      const userToken = this.authenticationService.getTokenForProfile();
      if (this.authenticationService.isLoggedIn()) {
         return true;
      } else {
         this.authenticationService.clearTokenForProfile();
      }
    }

    this.router.navigate(['login'], {
      queryParams: {
        returnRoute: state.url
      }
    });

    return false;
  }
}

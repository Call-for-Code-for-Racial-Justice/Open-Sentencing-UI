import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/appid-authentication.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.authenticationService.setTokenForProfile();

    this.router.navigateByUrl(this.authenticationService.getOriginalUrl());
  }
}

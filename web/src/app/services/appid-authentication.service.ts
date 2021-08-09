import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserToken } from '../models/UserToken';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import AppID from 'ibmcloud-appid-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly ORIGINAL_URL_COOKIE : string = "originalUrl";
  appid = new AppID();
  async ngOnInit() {
    try {
    this.appid.init({
      clientId: '<CLIENT-ID>', // REPLACE with APPID Credentials
      discoveryEndpoint: '<DISCOVERY-ENDPOINT-URL>' // REPLACE with APPID Credentials
    });
  } catch (e) {
    console.log("Login Error ::", e);
  }
}
  async onLoginClick() {
    try {
      const tokens = await this.appid.signin();
      const decodeIDTokens = tokens.idTokenPayload;
      const userName = 'Hi ' + decodeIDTokens.name + ', Congratulations!';
    } catch (e) {
      console.log("Error :: ", e)
    }
  }

    /**
   * This method is used to store the original url that the user requested before being redirected to IBMid login page, and 
   * navigate to it once authentication finishes.
   * 
   * @param originalUrl The original endpoint that the user requested before being redirected to IBMid login page.
   */
     setOriginalUrl(originalUrl: string) {
      localStorage.setItem(this.ORIGINAL_URL_COOKIE, originalUrl);
    }
  
  /**
   * Begins the authentication process, this method redirects to IBMid login page.
   */
  startAuthentication(): Promise<void> {
    return this.onLoginClick();
  }
}
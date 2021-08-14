import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserToken } from '../models/AppIdUserToken';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import AppID from 'ibmcloud-appid-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public userObj: UserToken = null;
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly ORIGINAL_URL_COOKIE : string = "originalUrl";
  private authPayload : JSON;
  appid = new AppID();

  constructor(
    private router: Router
  ) {
    this.initializeUser();
  }
  
  async ngOnInit() {
    try {
    this.appid.init({
      // REPLACE with credentials from IBM CLOUD APPID Service
      clientId: '<CLIENT-ID>',
      // REPLACE with credentials from IBM CLOUD APPID Service
      discoveryEndpoint: '<DISCOVERY-ENDPOINT-URL>'
    });
  } catch (e) {
    console.log("Login Error ::", e);
  }
}
  
async onLoginClick() {
    try {
      const tokens = await this.appid.signin();
      this.authPayload = tokens;
      this.setTokenForProfile();
      this.router.navigateByUrl('/cases', {
        "replaceUrl": true
      });
    } catch (e) {
      console.log("Error :: ", e)
    }
  }

  async initializeUser(): Promise<void>{
    this.userObj = this.getUser();
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

  getTokenForProfile(): UserToken {
    if (!this.userObj) {
      const rawToken = localStorage.getItem('user_token');
      if (rawToken) {
        const token = JSON.parse(rawToken);
        this.userObj = token;
        this._isLoggedIn.next(true);
        return this.userObj;
      }
      return null;
    }

    return this.userObj;
  }

  getLoggedInStatus(): Observable<any> {
    return this._isLoggedIn.asObservable();
  }

  async setTokenForProfile() {
    const idToken = this.authPayload['idToken'];
    let userObject = this.authPayload['idTokenPayload'];
    const email =  userObject['email'];
    const firstName =  userObject['given_name'];
    const lastName  =  userObject['family_name'];
    let expired =  false;
    let unixEpochTimeMS = userObject['exp'];
    console.log("Date in epoch :: " + unixEpochTimeMS);
    let expiryDate = new Date(parseInt(unixEpochTimeMS)* 1000);
    if (new Date().getTime() > unixEpochTimeMS*1000) {
      expired = true;
    }
    

    const userToken: UserToken = {
      'token': idToken,
      'expired': expired,
      'user': {
        'id': '',
        'emailAddress': email,
        'firstName': firstName,
        'lastName': lastName

      }
    };

    this.userObj = userToken;
    localStorage.setItem('user_token', JSON.stringify(this.userObj));
    
    this._isLoggedIn.next(true);
    return;
  }

  clearTokenForProfile() {
    this.userObj = null;
    this._isLoggedIn.next(false);
    this.authPayload = null;
    localStorage.clear();
  }

    /**
   * Get the previously authenticated user's info. 
   * @returns {User} A User object.
   */
    getUser(): UserToken {
       return this.userObj;
    }
  
    /**
     * Validates if the user has been previously authenticated succesfully.
     * 
     * @returns {boolean} true, if the user has been authenticated successfully  and if the user's session hasn't exipred yet,
     * otherwise false.
     */
    isLoggedIn(): boolean {
       return this.authPayload != null  && !this.userObj.expired;
    }

    /**
   * This method is useful after {@link this.completeAuthentication} method is called, in order to get the 
   * url that the user requested before being redirected to IBMid login page, and then, get the user redirected to
   * it.
   */
  getOriginalUrl(): string {
    return localStorage.getItem(this.ORIGINAL_URL_COOKIE);
  }
}
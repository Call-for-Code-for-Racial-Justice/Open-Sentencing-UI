import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserToken } from '../models/UserToken';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { authenticationIdTokenConfiguration } from '../configurations/oidcAuthenticationConfiguration';

export function getClientSettings(): UserManagerSettings {
  return authenticationIdTokenConfiguration;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public token: UserToken = null;
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly ORIGINAL_URL_COOKIE: string = 'originalUrl';
  private userManager = new UserManager(getClientSettings());
  private user: User = null;

  constructor() {
    this.initializeUser();
  }

  getTokenForProfile(): UserToken {
    if (!this.token) {
      const rawToken = localStorage.getItem('user_token');
      if (rawToken) {
        const token = JSON.parse(rawToken);
        this.token = token;
        this._isLoggedIn.next(true);
        return this.token;
      }
      return null;
    }

    return this.token;
  }

  getLoggedInStatus(): Observable<any> {
    return this._isLoggedIn.asObservable();
  }

  async setTokenForProfile() {
    const idToken = this.user.id_token;
    const email =  this.user.profile.email;
    const firstName =  this.user.profile.given_name;
    const lastName  =  this.user.profile.family_name;
    const userToken: UserToken = {
      token: idToken,
      user: {
        id: '',
        emailAddress: email,
        'firstName': firstName,
        'lastName': lastName
      }
    };

    this.token = userToken;
    localStorage.setItem('user_token', JSON.stringify(this.token));
    this._isLoggedIn.next(true);
    return;
  }

  clearTokenForProfile() {
    this.token = null;
    this._isLoggedIn.next(false);
    this.user = null;
    localStorage.clear();
  }

  async initializeUser(): Promise<void>{
    this.user = await this.userManager.getUser();
  }

  /**
   * Get the previously authenticated user's info. 
   * @returns {User} A User object.
   */
  getUser(): User {
    return this.user;
  }

  /**
   * Validates if the user has been previously authenticated succesfully.
   *
   * @returns {boolean} true, if the user has been authenticated successfully  and if the user's session hasn't exipred yet,
   * otherwise false.
   */
  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  /**
   * Returns the user's information.
   *
   * @returns {(Object | null)} An object with user's information only when it's being used id_token as response type, otherwise null
   * will be returned.
   */
  getClaims(): any {
    return this.user.profile;
  }

  /**
   * Returns authorization header value.
   *
   * @returns {(string | null)} 
   * A string representation of authorization header value only when it's being used token as response type, otherwise null
   * will be returned.
   */
  getAuthorizationHeaderValue(): string{
    return `${this.user.token_type} ${this.user.access_token}`
  }

  /**
   * Begins the authentication process, this method redirects to IBMid login page.
   */
  startAuthentication(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  /**
   * Finishes the authentication process,
   * this method must be called once IBMid redirects to the registered callback url, in order to save the user data.
   */
  async completeAuthentication(): Promise<void> {
    this.user = await this.userManager.signinRedirectCallback();
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
   * This method is useful after {@link this.completeAuthentication} method is called, in order to get the 
   * url that the user requested before being redirected to IBMid login page, and then, get the user redirected to
   * it.
   */
  getOriginalUrl(): string {
    return localStorage.getItem(this.ORIGINAL_URL_COOKIE);
  }
}

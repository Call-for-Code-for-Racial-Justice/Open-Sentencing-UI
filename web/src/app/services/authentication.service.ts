import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserToken } from '../models/UserToken';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
// import { authenticationIdTokenConfiguration } from '../configurations/oidcAuthenticationConfiguration';

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'x',
    client_id: '', // Read from property file
    redirect_uri: window.location.origin + '/',
    response_type: "id_token",
    scope: "openid",
    loadUserInfo: false,
    metadata: {
      issuer: 'https://prepiam.ice.ibmcloud.com/oidc/endpoint/default',
      authorization_endpoint: 'https://prepiam.ice.ibmcloud.com/oidc/endpoint/default/authorize'
    },
    signingKeys:[{
      kty: "RSA",
      kid: "prepiam.toronto.ca.ibm.com-dc",
      use: "sig",
      alg: "RS256",
      n: "h2lnuuQkUJoVsWsQnOX32_ksKvUQqts0PTINgjKrjfUSR-uVsaqKfWSKo6Qq9p7feImxrduG0dGHg5ZW6BWhM2G8Q2EcEm_CYBUdz_qjhllXh_4oftphubT0OXsgwRKgMmw7G4_vKlXpDMKrDusGfO5ra8BMxE32ada4AtRD7m0zKgBmie8-vRmVbsDFdB84AHGpA7xzI1LqqCBjXVjKddHyq-dSMXyLSE_KiQcnXPPBEBUyY1hP9ao2ZOdiYDpdBcAak4-i40bRFHyzPI2XQtKuU5oKbPl2eS9dZHCyH9U0ADiG-dqRHqnVYtskKjJeG_gb8kazaEXGa5AncdHSAQ",
      e: "AQAB",
      x5c: ["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"],
      "x5t#S256": "UFEkmQJtvqGZv2Fd4t7huCHfUDJ8U28IHeSpjrT6Kt0"
    }, {
      kty: "RSA",
      kid: "server",
      use: "sig",
      alg: "RS256",
      n: "nC-aaUF355cbgWh5MjwiA5j_4ZL0x-mMPNwD0ZPxKcWow3BUxf6xiHOXJYYgZFt_mqp_qWxLy3qGsiBYogHAZKfA3_F_0PanCU_QPV3UCwj5ukpvaOWamVKqwxQufZuIWasAHh2PJ12lT81zS2-6XS2Zn9N7_GCoYX3HJSNUtX6XpuanjXG04A1rChU0vLQKOF6kYDwAOzPjHTfsHOyVj819Qe2SrHlUcwLQTFe7cWYTGGI02HCByt8kmUVPlVxuH-losmXpv7xT8aYkv_bB4Nd5IORmLKuQqrnCsuoCe_I8MQEa-C_MSEjPkWU2Lv66sStHcQW1bC-h7XlYERiGgQ",
      e: "AQAB",
      x5c: ["MIIDMDCCAhigAwIBAgIEc0Zl+TANBgkqhkiG9w0BAQsFADBaMQkwBwYDVQQGEwAxCTAHBgNVBAgTADEJMAcGA1UEBxMAMQkwBwYDVQQKEwAxCTAHBgNVBAsTADEhMB8GA1UEAxMYcHJlcGlhbS5pY2UuaWJtY2xvdWQuY29tMB4XDTE4MTEyODE4NDkzNVoXDTI4MTEyNTE4NDkzNVowWjEJMAcGA1UEBhMAMQkwBwYDVQQIEwAxCTAHBgNVBAcTADEJMAcGA1UEChMAMQkwBwYDVQQLEwAxITAfBgNVBAMTGHByZXBpYW0uaWNlLmlibWNsb3VkLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJwvmmlBd+eXG4FoeTI8IgOY/+GS9MfpjDzcA9GT8SnFqMNwVMX+sYhzlyWGIGRbf5qqf6lsS8t6hrIgWKIBwGSnwN/xf9D2pwlP0D1d1AsI+bpKb2jlmplSqsMULn2biFmrAB4djyddpU/Nc0tvul0tmZ/Te/xgqGF9xyUjVLV+l6bmp41xtOANawoVNLy0CjhepGA8ADsz4x037BzslY/NfUHtkqx5VHMC0ExXu3FmExhiNNhwgcrfJJlFT5Vcbh/paLJl6b+8U/GmJL/2weDXeSDkZiyrkKq5wrLqAnvyPDEBGvgvzEhIz5FlNi7+urErR3EFtWwvoe15WBEYhoECAwEAATANBgkqhkiG9w0BAQsFAAOCAQEATXLu8zLmcoa8Er4GPUw/83N8iFw4WX9tdt75HEKNzZaJn/feJG5xYRZyzXN1YHG17UqYltcLyGrib5df9cZ0oKyLiPx55yFqRIcfNAQ2k7jcZLA3Bx0CSULN2ze7M7vR+iEyZMGCLv5O0JkegZwFZlNSBPpjWlF97PbK8YOy/212Lu1u8IaQMk79YUWzpXg/pZT6mUYaZ4sOsygCrjdqDGyD/QZYTtLbZoyNtjLBTADbuXb6BuhCr1Y9uERJ9piLHb1vawtUA9RUvRv4CbYBtOMEiDwqWBy+dtCNKqrF8+vo4Mkd/bVhoFrd3f2Xjo2H8VBU09rVmj0pUETKVdNbAw=="],
      "x5t#S256": "ic_i2_4AufySaxHk2JwcTVjcUNVdUenzZ5qq1smk6hs"
    }]
  }
}
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public token: UserToken = null;
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly ORIGINAL_URL_COOKIE: string = "originalUrl";
  private userManager = new UserManager(getClientSettings());
  private user: User = null;
  constructor() {
    this.initializeUser();
  }
  getTokenForProfile(): UserToken {
    if (!this.token) {
      const rawToken = localStorage.getItem("user_token");
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
    const email = this.user.profile.email;
    const firstName = this.user.profile.given_name;
    const lastName = this.user.profile.family_name;
    const userToken: UserToken = {
      token: idToken,
      user: {
        id: "",
        emailAddress: email,
        firstName: firstName,
        lastName: lastName,
      },
    };
    this.token = userToken;
    localStorage.setItem("user_token", JSON.stringify(this.token));
    this._isLoggedIn.next(true);
    return;
  }
  clearTokenForProfile() {
    this.token = null;
    this._isLoggedIn.next(false);
    this.user = null;
    localStorage.clear();
  }
  async initializeUser(): Promise<void> {
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
   * @returns {(string | null)} A string representation of authorization header value only when it's being used token as response type, otherwise null
   * will be returned.
   */
  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }
  /**
   * Begins the authentication process, this method redirects to IBMid login page.
   */
  startAuthentication(): Promise<void> {
    return this.userManager.signinRedirect();
  }
  /**
   * Finishes the authentication process, this method must be called once IBMid redirects to the registered callback url, in order to save the user data.
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

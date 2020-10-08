import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { UserToken } from '../models/UserToken';

import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user = null;
  public token: UserToken = null;
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) {
    const rawToken = localStorage.getItem('user_token');
    if (rawToken) {
      try {
        const token = JSON.parse(rawToken);
        this.token = token;
        this.isLoggedIn.next(true);
      } catch (err) {
        console.log('Caught exception parsing token');
        this.token = null;
        this.isLoggedIn.next(false);
      }
    }
  }

  getTokenForProfile(): UserToken {
    if (!this.token) {
      const rawToken = localStorage.getItem('user_token');
      if (rawToken) {
        const token = JSON.parse(rawToken);
        this.token = token;
        this.isLoggedIn.next(true);
        return this.token;
      }
      return null;
    }

    return this.token;
  }

  getLoggedInStatus(): Observable<any> {
    return this.isLoggedIn.asObservable();
  }

  async setTokenForProfile(token: UserToken) {
    this.token = token;
    localStorage.setItem('user_token', JSON.stringify(token));
    this.isLoggedIn.next(true);
    return;
  }

  async createTokenForProfile() {
    try {
      const token = await this.http
        .get<UserToken>(`${environment.defaultUIPath}/api/create-token`, httpOptions)
        .toPromise();

      await this.setTokenForProfile(token);
      this.isLoggedIn.next(true);
      return;
    } catch (err) {
      console.log('Caught error creating token');
      this.token = null;
      return;
    }
  }

  clearTokenForProfile() {
    this.token = null;
    this.isLoggedIn.next(false);
    localStorage.clear();
  }
}

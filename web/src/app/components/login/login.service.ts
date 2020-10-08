import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loginWithRedirect(url: string) {
    window.location.href = url;
    return;
  }
}

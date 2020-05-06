import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from './interfaces';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  private setToken (response) {
    if (response) {
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expData.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token () {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token')
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }
}

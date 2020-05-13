import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from './interfaces';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated$ = new BehaviorSubject<boolean>(!!this.token);

  constructor(
    private http: HttpClient
  ) {}

  login(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(response => this.setToken(response))
      )
  }

  setToken(response) {
    if (response) {
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expData.toString());
      localStorage.setItem('fb-token', response.idToken);
      this.isAuthenticated$.next(true);
    } else {
      localStorage.clear();
      this.isAuthenticated$.next(false);
    }
  }

  get token() {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date > expDate) {
      return null;
    }
    return localStorage.getItem('fb-token')
  }

  logout() {
    this.setToken(null);
  }


}

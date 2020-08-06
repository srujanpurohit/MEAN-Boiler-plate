import { Injectable } from '@angular/core';
import { LoginResponse } from '../interfaces/auth.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, pluck } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  user = new BehaviorSubject<LoginResponse['userData'] | null>(
    JSON.parse(localStorage.getItem('user'))
  );

  public get authToken(): LoginResponse['token'] {
    return localStorage.getItem('token');
  }
  public set authToken(token: LoginResponse['token'] | null) {
    localStorage.setItem('token', token);
  }

  login({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Observable<LoginResponse['userData']> {
    return this.http
      .post<LoginResponse>(`${environment.appUrl}api/auth/login`, {
        email,
        password
      })
      .pipe(
        tap(({ token, userData }) => {
          this.user.next(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          this.authToken = token;
        }),
        pluck('user')
      );
  }
}

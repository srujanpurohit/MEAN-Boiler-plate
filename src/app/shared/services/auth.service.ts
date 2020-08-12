import { Injectable } from '@angular/core';
import { LoginResponse } from '../interfaces/auth.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, pluck } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private user$ = new BehaviorSubject<LoginResponse['userData'] | null>(
    JSON.parse(localStorage.getItem('user'))
  );

  public get user(): Observable<LoginResponse['userData'] | null> {
    return this.user$.asObservable();
  }

  public get authToken(): LoginResponse['token'] {
    return localStorage.getItem('token');
  }
  public set authToken(token: LoginResponse['token'] | null) {
    localStorage.setItem('token', token);
  }

  public login({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Observable<LoginResponse['userData']> {
    return this.http
      .post<LoginResponse>(`${environment.appUrl}auth/login`, {
        email,
        password
      })
      .pipe(
        tap(({ token, userData }) => {
          this.user$.next(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          this.authToken = token;
        }),
        pluck('userData')
      );
  }
  public logout(): void {
    this.user$.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/Login');
  }
}

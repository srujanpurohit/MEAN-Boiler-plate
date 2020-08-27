import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.isLoggedIn();
  }

  canActivateChild(): Observable<boolean> {
    return this.isLoggedIn();
  }
  isLoggedIn(): Observable<boolean> {
    return this.authService.user.pipe(
      map(user => {
        if (user) {
          return true;
        }
        this.router.navigateByUrl('auth/Login');
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleRightsGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.user.pipe(
      map(user => {
        const moduleName = next?.data?.moduleName;
        if (moduleName) {
          if (user?.roleSummary?.moduleRights?.[moduleName]?.read) {
            return true;
          }
        } else {
          throw new Error('Invalid moduleName');
        }
        return false;
      })
    );
  }
}

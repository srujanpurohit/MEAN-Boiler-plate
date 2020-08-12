import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  CanLoad,
  Data,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { modules } from '../../../../server/config/modulesAndRights';
import { UserData } from '../interfaces/auth.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleRightsGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {}
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasModuleRights(next.data);
  }
  canLoad(route: Route): Observable<boolean> {
    return this.hasModuleRights(route.data);
  }
  hasModuleRights(data: Data): Observable<boolean> {
    return this.authService.user.pipe(
      map((user: UserData) => {
        const moduleName = data?.moduleName;
        const moduleRight = data?.moduleRight ?? 'read';
        if (
          moduleName &&
          user?.roleSummary?.moduleRights?.[moduleName]?.[moduleRight]
        ) {
          return true;
        } else if (modules.indexOf(moduleName) < 0) {
          throw new Error(
            `Invalid moduleName ${moduleName}, expected values: ${modules}`
          );
        } else if (
          ['create', 'read', 'update', 'delete'].indexOf(moduleRight)
        ) {
          throw new Error(`Invalid right name: ${moduleRight}`);
        }
        return false;
      })
    );
  }
}

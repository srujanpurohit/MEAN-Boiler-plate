import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../shared/interfaces/role.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class RolesService {
  constructor(private http: HttpClient) {}
  private roleBaseUrl = environment.apiUrl + 'roles/';

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleBaseUrl);
  }

  public getRole(roleId: Role['_id']): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleBaseUrl + roleId);
  }

  public saveRole(role: Role): Observable<any> {
    return this.http.post(this.roleBaseUrl, role);
  }
  public updateRole(roleId: Role['_id'], role: Role): Observable<any> {
    return this.http.put(this.roleBaseUrl + roleId, role);
  }
  public deleteRole(roleId: Role['_id']): Observable<any> {
    return this.http.delete(this.roleBaseUrl + roleId);
  }
}

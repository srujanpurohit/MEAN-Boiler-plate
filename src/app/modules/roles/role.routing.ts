import { RouterModule } from '@angular/router';
import { RolesFormComponent } from './components/roles-form/roles-form.component';
import { RolesDashboardComponent } from './components/roles-dashboard/roles-dashboard.component';
import { ModuleRightsGuard } from '../shared/guards/module-rights.guard';

export const RoleRouting = RouterModule.forChild([
  {
    path: '',
    component: RolesDashboardComponent,
    children: [
      {
        path: 'add',
        component: RolesFormComponent,
        canActivate: [ModuleRightsGuard],
        data: { moduleName: 'role', moduleRights: 'create' }
      },
      {
        path: ':id',
        component: RolesFormComponent,
        canActivate: [ModuleRightsGuard],
        data: { moduleName: 'role', moduleRights: 'update' }
      }
    ]
  }
]);

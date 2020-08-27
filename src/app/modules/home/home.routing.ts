import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ModuleRightsGuard } from '../shared/guards';

export const HomeRouting = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('../roles/roles.module').then(m => m.RolesModule),
    canActivate: [ModuleRightsGuard],
    data: { moduleName: 'role' }
  }
]);

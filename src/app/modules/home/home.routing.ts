import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ModuleRightsGuard } from 'src/app/shared/guards';

export const HomeRouting = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('./modules/roles/roles.module').then(m => m.RolesModule),
    canActivate: [ModuleRightsGuard],
    data: { moduleName: 'role' }
  }
]);

import { RouterModule } from '@angular/router';
import { LoggedInGuard, ModuleRightsGuard } from './shared/guards';
import { AppComponent } from './app.component';

export const AppRouting = RouterModule.forRoot([
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        canActivate: [LoggedInGuard],
        loadChildren: () =>
          import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }
]);

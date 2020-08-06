import { RouterModule } from '@angular/router';
import { LoggedInGuard } from './shared/guards';
import { AppComponent } from './app.component';

export const AppRouting = RouterModule.forRoot([
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then(m => m.HomeModule)
      }
    ],
    canActivate: [LoggedInGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
]);

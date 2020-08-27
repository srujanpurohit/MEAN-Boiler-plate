import { RouterModule } from '@angular/router';
import { LoggedInGuard, ModuleRightsGuard } from './modules/shared/guards';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
      },
      { path: '404', component: NotFoundComponent },
      {
        path: '**',
        redirectTo: '404'
      }
    ]
  }
]);

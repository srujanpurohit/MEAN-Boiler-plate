import { RouterModule } from '@angular/router';
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
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
]);

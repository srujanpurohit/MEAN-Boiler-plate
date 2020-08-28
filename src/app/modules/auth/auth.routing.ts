import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';

export const AuthRouting = RouterModule.forChild([
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Register',
    component: RegisterComponent
  },
  {
    path: 'Forgot',
    component: ForgotComponent
  },
  {
    path: 'Reset',
    component: ResetComponent
  }
]);

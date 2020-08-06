import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthRouting } from './auth.routing';

@NgModule({
  declarations: [],
  imports: [SharedModule, AuthRouting]
})
export class AuthModule {}

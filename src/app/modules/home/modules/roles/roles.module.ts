import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesFormComponent } from './components/roles-form/roles-form.component';
import { RolesDashboardComponent } from './components/roles-dashboard/roles-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoleRouting } from './role.routing';

@NgModule({
  declarations: [RolesFormComponent, RolesDashboardComponent],
  imports: [CommonModule, SharedModule, RoleRouting]
})
export class RolesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@NgModule({
  providers: [AuthService],
  exports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class SharedModule {}

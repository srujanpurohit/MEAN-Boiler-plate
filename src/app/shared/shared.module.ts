import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  providers: [],
  exports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class SharedModule {}

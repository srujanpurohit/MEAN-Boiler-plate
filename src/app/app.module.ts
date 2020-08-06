import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRouting, HttpClientModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

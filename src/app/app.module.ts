import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FarmanComponent } from './farman/farman.component';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { TestService } from './test.service';


@NgModule({
  declarations: [
    AppComponent,
    FarmanComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

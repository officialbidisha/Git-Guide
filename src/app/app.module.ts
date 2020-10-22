import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { GitservicesService} from './gitservices.service';
import { HttpClientModule } from '@angular/common/http';
import {ChartModule} from 'primeng/chart';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartModule
  ],
  providers: [GitservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

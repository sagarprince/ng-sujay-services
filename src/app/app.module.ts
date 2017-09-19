// Core Modules
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

// Shared Module
import { SharedModule } from './shared/shared.module';

// Pages Modules
import { LoginModule, DashboardModule, MasterModule, SettingsModule } from './pages';

// Components Modules
import { HeaderModule, SidebarModule } from './components';

// App Component
import { AppComponent } from './app.component';

// App Routing Module
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    AppRoutingModule,

    HeaderModule,
    SidebarModule,
    
    LoginModule,
    DashboardModule,
    MasterModule,
    SettingsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

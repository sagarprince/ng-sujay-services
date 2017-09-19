// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Login Component
import { LoginComponent } from './login.component';

// Shared Module
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }

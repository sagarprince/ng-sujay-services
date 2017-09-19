// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { SweetAlertComponent } from './sweet-alert.component';

// Controller Service
import { SweetAlertController } from './sweet-alert.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SweetAlertComponent
  ],
  exports: [
    SweetAlertComponent
  ],
  providers: [
    SweetAlertController
  ],
  entryComponents: [
    SweetAlertComponent
  ]
})
export class SweetAlertModule { }

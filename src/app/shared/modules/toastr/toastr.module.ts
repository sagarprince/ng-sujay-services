// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { ToastrComponent } from './toastr.component';

// Controller Service
import { ToastrController } from './toastr.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ToastrComponent
  ],
  exports: [
    ToastrComponent
  ],
  providers: [
    ToastrController
  ],
  entryComponents: [
    ToastrComponent
  ]
})
export class ToastrModule { }

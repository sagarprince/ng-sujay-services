// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HeaderTitleComponent } from './header-title.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderTitleComponent
  ],
  exports: [
    HeaderTitleComponent
  ]
})
export class HeaderTitleModule { }

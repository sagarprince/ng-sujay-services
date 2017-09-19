// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom Modules
import { HeaderTitleModule } from '../../components';

// Components
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderTitleModule
  ],
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }

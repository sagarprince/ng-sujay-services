// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom Modules
import { HeaderTitleModule } from '../../components';

// Components
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderTitleModule
  ],
  declarations: [
    SettingsComponent
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }

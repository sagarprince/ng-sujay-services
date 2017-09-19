// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom Modules
import { HeaderTitleModule } from '../../components';

// Shared Modules
import { SharedModule } from '../../shared/shared.module';

// Child Routing Module
import { MasterRoutingModule } from './master-routing.module';

// Components
import { MasterComponent } from './master.component';
import { MasterAddEditComponent } from './master-add-edit/master-add-edit.component';

// Services
import { MasterService } from './master.service';
import { MasterSharedService } from './master-shared.service';


@NgModule({
  imports: [
    CommonModule,
    HeaderTitleModule,
    SharedModule,
    MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MasterComponent,
    MasterAddEditComponent
  ],
  exports: [
    MasterComponent
  ],
  providers: [
    MasterService,
    MasterSharedService
  ]
})
export class MasterModule { }

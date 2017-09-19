// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom Modules
import { HeaderTitleModule } from '../../components';
import { MasterModule } from '../';

// Shared Modules
import { SharedModule } from '../../shared/shared.module';

// Child Routing Module
import { OrdersRoutingModule } from './orders-routing.module';

// Services
import { OrdersService } from './orders.service';
import { OrdersSharedService } from './orders-shared.service';

// Components
import { OrdersComponent } from './orders.component';

import { OrdersAddEditComponent } from './add-edit-orders/add-edit-orders.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderTitleModule,
    SharedModule,
    OrdersRoutingModule,
    MasterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrdersComponent,
    OrdersAddEditComponent
  ],
  exports: [
    OrdersComponent,
    OrdersAddEditComponent
  ],
  providers: [
    OrdersService,
    OrdersSharedService
  ]
})
export class OrdersModule { }

// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom Modules
import { HeaderTitleModule } from '../../components';
import { OrdersModule } from '../';

// Shared Modules
import { SharedModule } from '../../shared/shared.module';

// Child Routing Module
import { InvoicesRoutingModule } from './invoices-routing.module';

// Components
import { InvoicesComponent } from './invoices.component';
import { InvoicesAddEditComponent } from './add-edit-invoices/add-edit-invoices.component';
import { JobDetailsRowComponent } from './add-edit-invoices/job-details-row/job-details-row.component';


@NgModule({
  imports: [
    CommonModule,
    HeaderTitleModule,
    SharedModule,
    InvoicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersModule
  ],
  declarations: [
    InvoicesComponent,
    InvoicesAddEditComponent,
    JobDetailsRowComponent   
  ],
  exports: [
    InvoicesComponent
  ],
  providers: [

  ]
})
export class InvoicesModule { }

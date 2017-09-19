// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { DataTablesComponent } from './data-tables.component';
import { DataTablesPaginationComponent } from './data-tables-pagination/data-tables-pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DataTablesComponent,
    DataTablesPaginationComponent
  ],
  exports: [
    DataTablesComponent
  ]
})
export class DataTablesModule { }

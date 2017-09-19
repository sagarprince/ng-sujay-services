// Core Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Routing Pages
import { InvoicesComponent } from './invoices.component';
import { InvoicesAddEditComponent } from './add-edit-invoices/add-edit-invoices.component';


const routes: Routes = [
    {
         path: '',
         component: InvoicesComponent,
         pathMatch: 'full'
    },
    {
        path: 'invoice/add',
        component: InvoicesAddEditComponent,
        data: {
            mode: 'add'
        }
    },
    {
        path: 'invoice/edit/:id',
        component: InvoicesAddEditComponent,
        data: {
            mode: 'edit'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InvoicesRoutingModule { }

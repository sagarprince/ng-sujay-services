// Core Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Routing Pages
import { OrdersComponent } from './orders.component';
import { OrdersAddEditComponent } from './add-edit-orders/add-edit-orders.component';


const routes: Routes = [
    {
         path: '',
         component: OrdersComponent,
         pathMatch: 'full'
    },
    {
        path: 'order/add',
        component: OrdersAddEditComponent,
        data: {
            mode: 'add'
        }
    },
    {
        path: 'order/edit/:id',
        component: OrdersAddEditComponent,
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
export class OrdersRoutingModule { }

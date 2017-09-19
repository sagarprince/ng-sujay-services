// Core Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Routing Pages
import { MasterComponent } from './master.component';
import { MasterAddEditComponent } from './master-add-edit/master-add-edit.component';

const routes: Routes = [
    {
         path: '',
         component: MasterComponent
    },
    { 
        path: 'master/item/add', 
        component: MasterAddEditComponent,
        data: {
            mode: 'add'
        }
    },
    { 
        path: 'master/item/edit/:id', 
        component: MasterAddEditComponent,
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
export class MasterRoutingModule { }

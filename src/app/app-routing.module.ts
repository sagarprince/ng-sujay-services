// Core Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Routing Pages
import { DashboardComponent, SettingsComponent } from './pages';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent 
  },
  { 
    path: 'master', 
    loadChildren: './pages/master/master.module#MasterModule'
  },
  { 
    path: 'orders', 
    loadChildren: './pages/orders/orders.module#OrdersModule'
  },
  { 
    path: 'invoices', 
    loadChildren: './pages/invoices/invoices.module#InvoicesModule'
  },
  { 
    path: 'settings', 
    component: SettingsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

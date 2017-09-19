// Core Imports
import { Component, OnInit } from '@angular/core';

// Services
import { EmitterService } from '../../shared/services';

// MenuItem Model
export interface MenuItem {
  title: string,
  link: string,
  icon: string,
  active: boolean
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menus: Array<MenuItem> = [];

  isSidebarToggle: boolean = false;

  constructor() { 
    this.menus = [
      {
        title: 'Dashboard',
        link: '/dashboard',
        icon: 'icon_desktop',
        active: true
      },
      {
        title: 'Master',
        link: '/master',
        icon: 'icon_archive_alt',
        active: false
      },
      {
        title: 'Orders',
        link: '/orders',
        icon: 'fa fa-file-text',
        active: false
      },
      {
        title: 'Invoices',
        link: '/invoices',
        icon: 'ti-receipt',
        active: false
      },
      {
        title: 'Settings',
        link: '/settings',
        icon: 'ti-settings',
        active: false
      }
    ];

    EmitterService.get('toggle-sidebar').subscribe((toggle) => {
      this.isSidebarToggle = toggle;
    });
  }

  ngOnInit() {
    
  }

}

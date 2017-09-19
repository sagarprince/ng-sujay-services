// Core Imports
import { Component, OnInit } from '@angular/core';

// Services
import { EmitterService } from '../../shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sidebarToggle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.sidebarToggle = !this.sidebarToggle;
    EmitterService.get('toggle-sidebar').emit(this.sidebarToggle);
  }

}

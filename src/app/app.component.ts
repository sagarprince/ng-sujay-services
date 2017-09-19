// Core Imports
import { Component } from '@angular/core';

// Services
import { EmitterService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isSidebarToggle: boolean = false;

  constructor() {
    EmitterService.get('toggle-sidebar').subscribe((toggle) => {
      this.isSidebarToggle = toggle;
    });
  }
}

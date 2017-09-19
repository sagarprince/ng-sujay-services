import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html'
})
export class HeaderTitleComponent {

  @Input() title: string = '';

  @Input() icon: string = '';

  @Input() backButton: string = 'no';

  @Input() backLink: string = '';

  constructor(private _router: Router) {

  }

  public back(): void {
    if (this.backLink !== '') {
      this._router.navigate([this.backLink]);
    }
  }

}

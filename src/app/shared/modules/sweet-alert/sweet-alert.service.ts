// Core Modules
import { Injectable } from '@angular/core';

// Services
import { ComponentFactoryService } from '../../services';

// Component
import { SweetAlertComponent } from './sweet-alert.component';

// Config Model
import { ConfigModel } from './models';

// Active Sweet Alert Class
import { ActiveSweetAlert } from './active-sweet-alert';

@Injectable()
export class SweetAlertController {

  componentRef: any = void 0;

  constructor(private _componentFactory: ComponentFactoryService) { 
    
  }

  /**
   * Open Sweet alert
   * 
   * @param config
   * @method open
   */
  public open(config: ConfigModel): ActiveSweetAlert {   

    // Generate Component
    const id = 'sweet-alert-container-' + Math.floor(Math.random() * 200);
    this.componentRef = this._componentFactory.createComponent<SweetAlertComponent>(SweetAlertComponent, id);

    // Instance 
    const _instance = this.componentRef.instance;

    // Append to body
    this._componentFactory.attachToApplication(this.componentRef);

    // Using instance call component methods
    _instance.show();
    _instance.setConfig(config);

    return new ActiveSweetAlert(this._componentFactory, this.componentRef);
  }

}

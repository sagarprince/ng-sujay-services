// Core Modules
import { ComponentRef } from "@angular/core";

// Component
import { SweetAlertComponent } from './sweet-alert.component';

// Services
import { ComponentFactoryService } from '../../services';

// Config Model
import { ConfigModel } from './models';

export class ActiveSweetAlert {

    public get component():SweetAlertComponent {
        return this._componentRef.instance;
    }

    constructor(public _componentFactory: ComponentFactoryService, public _componentRef: ComponentRef<SweetAlertComponent>) {
        this.component.deny.subscribe((result: any) => {
            this.close();
        });
    }    

    public onApprove(callback:(result: any) => void): ActiveSweetAlert {        
        this.component.approve.subscribe((result: any) => {
            this.close();

            callback(result);
        });

        return this;
    }

    public close(): void {
        this._componentFactory.detachFromApplication(this._componentRef);
        this._componentRef.destroy();
    }

}

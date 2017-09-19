// Core
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Shared Controllers
import { SweetAlertController } from '../../shared/modules/sweet-alert';
import { ToastrController } from '../../shared/modules/toastr';

// Services
import { EmitterService } from '../../shared/services';
import { OrdersService } from './orders.service'

@Injectable()
export class OrdersSharedService {

  constructor(private _router: Router,
    private ordersService: OrdersService,
    public alertCtrl: SweetAlertController,
    public toastCtrl: ToastrController) { }

  public deleteOrder(id: number, redirect: boolean = false) {
        this.alertCtrl.open({
            title: 'Are you sure?',
            message: 'Want to delete this order?',
            type: 'warning',
            animationType: 'slide-from-top',
            isConfirm: true,
            showCancelButton: true,
            okButtonText: 'Yes',
            cancelButtonText: 'No'
        })
        .onApprove((result) => {
            this.toastCtrl.show({ type: 'loading', title: 'Please wait', autoHide: false });

            this.ordersService.deleteOrder(id).subscribe((data: any) => {
                if (redirect === false) {
                    EmitterService.get('orderDeleted').emit(true);
                } else {
                    this._router.navigate(['/orders/nr-enterprise']);
                }

                this.toastCtrl.hide();
                this.toastCtrl.show({ type: 'success', title: 'Success', message: data.message });
            }, (error) => {
                this.toastCtrl.hide();
                this.toastCtrl.show({ type: 'error', title: 'Error', message: error.message });
            });
        });
    }

}

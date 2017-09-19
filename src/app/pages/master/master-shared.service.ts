import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { MasterService } from './master.service';
import { EmitterService } from '../../shared/services';


// Shared Controllers
import { SweetAlertController } from '../../shared/modules/sweet-alert';
import { ToastrController } from '../../shared/modules/toastr';

@Injectable()
export class MasterSharedService {

  constructor(private _router: Router,
  public alertCtrl: SweetAlertController,
  public toastCtrl: ToastrController,
  private masterService: MasterService) { }

  deleteItem(id: number, redirect: boolean = false) {
    this.alertCtrl.open({
        title: 'Are you sure?',
        message: 'Want to delete this master item?',
        type: 'warning',
        animationType: 'slide-from-top',
        isConfirm: true,
        showCancelButton: true,
        okButtonText: 'Yes',
        cancelButtonText: 'No'
    })
    .onApprove((result) => {
      this.toastCtrl.show({ type: 'loading', title: 'Please wait', autoHide: false });

      this.masterService.deleteMasterItem(id).subscribe((data: any) => {
        if (redirect === false) {
          EmitterService.get('itemDeleted').emit(true);
        } else {
          this._router.navigate(['/master']);
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

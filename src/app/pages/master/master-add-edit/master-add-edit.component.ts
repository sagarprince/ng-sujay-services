// Core
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// Shared Controllers
import { SweetAlertController } from '../../../shared/modules/sweet-alert';
import { ToastrController } from '../../../shared/modules/toastr';

// Services
import { MasterService } from '../master.service';
import { MasterSharedService } from '../master-shared.service';

// Constant
import { Constant } from '../../../shared/constants';

@Component({
  selector: 'app-master-add-edit',
  templateUrl: './master-add-edit.component.html',
  styleUrls: ['./master-add-edit.component.scss']
})
export class MasterAddEditComponent implements OnInit, OnDestroy {

  routerParamSub: any = null;

  mode: string = 'add';

  id: number;

  headerTitle = 'Add Master Item';

  masterItemForm: FormGroup = null;

  loading: boolean = false;

  waitFlag: boolean = false;

  enterprises: Array<string> = Constant['enterprises'];

  constructor(private route: ActivatedRoute, 
  private _router: Router,
  public masterSharedService: MasterSharedService,
  private masterService: MasterService,
  private formBuilder: FormBuilder, 
  public alertCtrl: SweetAlertController,
  public toastCtrl: ToastrController) { 

    if (route.snapshot.data) {
      this.mode = route.snapshot.data['mode'];

      if (this.mode === 'edit') {
        this.headerTitle = 'Edit Master Item';
      }
    }
  }

  ngOnInit() {
    this.setFormControls();

    if (this.mode === 'edit') {
      this.routerParamSub = this.route.params.subscribe(params => {
          this.id = +params['id'];     
          this.getItemDetails();            
      });
    }
  }

  getItemDetails() {
    this.loading = true;

    this.masterService.getMasterItem(this.id).subscribe((data: any) => {
      const itemDetails = data.item;         
      this.setFormControlsValues(itemDetails);
      this.loading = false;
    }, (error) => {     
      if (error.error_code === 'invalid_id') {
        this._router.navigate(['/master']);
        this.alertCtrl.open({
            title: 'Error',
            message: 'Invalid master item !!!',
            type: 'error'
        })
        .onApprove(() => {});
      }

      this.loading = false;
    });
  }

  setFormControls() {   
    this.masterItemForm = this.formBuilder.group({
      item_code: new FormControl('', [Validators.required]),
      item_name: new FormControl('', [Validators.required]),
      item_quantity: new FormControl('', [Validators.required]),
      item_rate: new FormControl('', [Validators.required]),
      id: new FormControl('')
    });
  }

  setFormControlsValues(itemDetails?: any) {
    const item_code = (typeof itemDetails !== 'undefined') ? itemDetails.item_code : '';
    const item_name = (typeof itemDetails !== 'undefined') ? itemDetails.item_name : '';
    const qty = (typeof itemDetails !== 'undefined') ? itemDetails.item_quantity : '';
    const rate = (typeof itemDetails !== 'undefined') ? itemDetails.item_rate : '';
    const id = (typeof itemDetails !== 'undefined') ? itemDetails.id : '';    

    this.masterItemForm.patchValue({
      item_code: item_code,
      item_name: item_name,
      item_quantity: qty,
      item_rate: rate,
      id: id
    });
  }

  saveItem({ value, valid }: { value: any, valid: boolean }) {

    if (!valid) {
      this.masterItemForm.markAsDirty();      
    } else {
      this.masterItemForm.markAsPristine();

      const itemData = value;
      itemData.mode = this.mode;

      this.waitFlag = true;
      this.toastCtrl.show({ type: 'loading', title: 'Please wait', autoHide: false });

      this.masterService.saveMasterItem(itemData).subscribe((data: any) => {
        this._router.navigate(['/master']);

        this.waitFlag = false;
        this.toastCtrl.hide();
        this.toastCtrl.show({ type: 'success', title: 'Success', message: data.message });
      }, (error) => {
        this.waitFlag = false;
        this.toastCtrl.hide();
        this.toastCtrl.show({ type: 'error', title: 'Error', message: error.message });
      });   
    }
  }

  deleteItem() {
    this.masterSharedService.deleteItem(this.id, true);
  }

  ngOnDestroy() {
    if (this.mode === 'edit') {
      this.routerParamSub.unsubscribe();
    }
  }

}

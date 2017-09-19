// Core
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// Shared Controllers
import { SweetAlertController } from '../../../shared/modules/sweet-alert';
import { ToastrController } from '../../../shared/modules/toastr';

// Services
import { OrdersService } from '../orders.service';
import { OrdersSharedService } from '../orders-shared.service';
import { CacheService } from '../../../shared/services';

// Constant
import { Constant } from '../../../shared/constants';

declare var $;

@Component({
  selector: 'app-add-edit-orders',
  templateUrl: './add-edit-orders.component.html',
  styleUrls: ['./add-edit-orders.component.scss']
})
export class OrdersAddEditComponent implements OnInit {

  routerParamSub: any = null;

  mode: string = 'add';

  id: number;

  headerTitle = 'Add NR Enterprise Order';

  orderForm: FormGroup = null;

  loading: boolean = false;

  waitFlag: boolean = false;

  items: Array<any> = [];

  showItemsHeader: boolean = false;

  showItemsActionColumn: boolean = false;

  addNewItemBtn: boolean = false;

  showItemsRowCheckbox: boolean = true;

  selectedItemIds: Array<number> = [];

  waitItemAdding: boolean = false;

  constructor(private route: ActivatedRoute, 
  private _router: Router,
  public ordersSharedService: OrdersSharedService,
  private ordersService: OrdersService,
  private formBuilder: FormBuilder, 
  public alertCtrl: SweetAlertController,
  public toastCtrl: ToastrController) { 

    if (route.snapshot.data) {
      this.mode = route.snapshot.data['mode'];

      if (this.mode === 'edit') {
        this.headerTitle = 'Edit NR Enterprise Order';
      }
    }
  }

  ngOnInit() {    
    this.setFormControls();

    if (this.mode === 'edit') {
      this.routerParamSub = this.route.params.subscribe(params => {
          this.id = +params['id'];     
          this.getOrderDetails();   
      });
    }
  }

  getOrderDetails() {
    this.loading = true;

    this.ordersService.getOrder(this.id).subscribe((data: any) => {
      const orderDetails = data.order;         
      this.setFormControlsValues(orderDetails);
      this.loading = false;
    }, (error) => {   
      if (error.error_code === 'invalid_order_id') {
        this._router.navigate(['/orders/nr-enterprise']);
        this.alertCtrl.open({
            title: 'Error',
            message: 'Invalid order !!!',
            type: 'error'
        })
        .onApprove(() => {});
      }

      this.loading = false;
    });
  }

  setFormControls() {   
    this.orderForm = this.formBuilder.group({
      order_job_no: new FormControl('', [Validators.required]),
      order_item_code: new FormControl('', [Validators.required]),
      order_quantity: new FormControl('', [Validators.required]),
      order_date: new FormControl('', [Validators.required]),      
      id: new FormControl('')
    });
  }

  setFormControlsValues(orderDetails?: any) {
    const order_job_no = (typeof orderDetails !== 'undefined') ? orderDetails.order_job_no : '';
    const order_item_code = (typeof orderDetails !== 'undefined') ? orderDetails.order_item_code : '';
    const order_quantity = (typeof orderDetails !== 'undefined') ? orderDetails.order_quantity : '';
    const order_date = (typeof orderDetails !== 'undefined') ? orderDetails.order_date : '';    
    const id = (typeof orderDetails !== 'undefined') ? orderDetails.id : '';    

    this.orderForm.patchValue({
      order_job_no: order_job_no,
      order_item_code: order_item_code,
      order_quantity: order_quantity,
      order_date: order_date,
      id: id
    });
  }

  addItem(): void {
    if (this.mode === 'add') {
      $('.masterItemsModal').modal('show'); 
    }
  }

  selectedItems(ids: Array<number>) {
    this.selectedItemIds = ids;
  }

  addSelectedItem(): void {
    if (this.selectedItemIds.length > 0) {
      console.log(this.selectedItemIds);
      this.orderForm.get('order_item_code').setValue(this.selectedItemIds[0]);
      $('.masterItemsModal').modal('hide'); 
    } else {
      this.toastCtrl.show({ type: 'error', title: 'Error', message: 'Please select any master item !!!' });
    }
  }

  saveOrder({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) {
      this.orderForm.markAsDirty();      
    } else {
      this.orderForm.markAsPristine();
      this.waitFlag = true;

      const orderData = value;
      orderData.mode = this.mode;

      this.waitFlag = true;
      this.toastCtrl.show({ type: 'loading', title: 'Please wait', autoHide: false });

      this.ordersService.saveOrder(orderData).subscribe((data: any) => {
        CacheService.set('nrOrdersCount', data.ordersCount);
        this._router.navigate(['/orders']);       

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

  deleteOrder() {
    this.ordersSharedService.deleteOrder(this.id, true); 
  }  

  ngOnDestroy() {
    if (this.mode === 'edit') {
      this.routerParamSub.unsubscribe();
    }
  }

}

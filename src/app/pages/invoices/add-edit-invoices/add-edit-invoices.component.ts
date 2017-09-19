// Core
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

// Shared Controllers
import { SweetAlertController } from '../../../shared/modules/sweet-alert';
import { ToastrController } from '../../../shared/modules/toastr';

// Services
import { CacheService, UtilitiesService } from '../../../shared/services';
import { OrdersService } from '../../orders/orders.service';
import { MasterService } from '../../master/master.service';

import {Observable} from 'rxjs/Rx';

declare var window, $;

@Component({
  selector: 'app-add-edit-invoices',
  templateUrl: './add-edit-invoices.component.html',
  styleUrls: ['./add-edit-invoices.component.scss'],
  providers: [
    OrdersService,
    MasterService
  ]
})
export class InvoicesAddEditComponent implements OnInit {

  routerParamSub: any = null;

  mode: string = 'add';

  id: number;

  headerTitle = 'Add NR Enterprise Invoice';

  invoiceForm: FormGroup = null;

  loading: boolean = false;

  waitFlag: boolean = false;

  viewMode: boolean = false;

  showOrdersHeader: boolean = false;

  showOrdersActionColumn: boolean = false;

  addNewOrderBtn: boolean = false;

  showOrdersRowCheckbox: boolean = true;

  selectedOrderIds: Array<number> = [];

  waitJobAdding: boolean = false;

  constructor(private route: ActivatedRoute, 
  private _router: Router,
  private ordersService: OrdersService,
  private masterService: MasterService,
  private formBuilder: FormBuilder, 
  public alertCtrl: SweetAlertController,
  public toastCtrl: ToastrController,
  public utilites: UtilitiesService) { 
    if (route.snapshot.data) {
      this.mode = route.snapshot.data['mode'];

      if (this.mode === 'edit') {
        this.headerTitle = 'Edit NR Enterprise Order';
      }
    }
  }

  ngOnInit() {
    this.setFormControls();
    this.getOrdersMasters();
  }

  getOrdersMasters() {
    Observable.forkJoin(
      this.ordersService.getOrders({}),
      this.masterService.getItems({})
    ).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err)
    );
  }

  setFormControls() {   
    this.invoiceForm = this.formBuilder.group({
      print_type: new FormControl('ORIGINAL', [Validators.required]),    
      gst_in_no: new FormControl('27ACLPP4774D1ZA', [Validators.required]),   
      work_order_no_date: new FormControl('138 / 01-04-2001', [Validators.required]),  
      state: new FormControl('MAHARASHTRA', [Validators.required]),
      transport_mode: new FormControl('BY ROAD', [Validators.required]),
      bill_no: new FormControl('', [Validators.required]),
      state_code: new FormControl('27', [Validators.required]),
      vehicle_no: new FormControl('', [Validators.required]),
      invoice_date: new FormControl('', [Validators.required]),
      bill_to_party: this.billShipToPartyModel(),
      ship_to_party: this.billShipToPartyModel(),
      order_jobs: this.formBuilder.array([]),
      taxable_total_amount: new FormControl(''),
      cgst_total_amount: new FormControl(''),
      sgst_total_amount: new FormControl(''),
      gst_total_amount: new FormControl(''),
      gst_total_amount_words: new FormControl('', [Validators.required]),
      declaration: new FormControl(''),
      id: new FormControl('')
    });
  }

  get orderJobs(): FormArray {
    return this.invoiceForm.get('order_jobs') as FormArray;
  };

  private billShipToPartyModel(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('EMERSON CLIMATE TECHNOLOGIES (I) P.LTD', [Validators.required]),
      address: new FormControl('ATIT - PALI ROAD,TAL - SATARA DIST-SATARA,ATIT-415519', [Validators.required]),
      gst_in_no: new FormControl('27AAACK7291C1ZL', [Validators.required]),
      state: new FormControl('MAHARASHTRA', [Validators.required]),
      state_code: new FormControl('27', [Validators.required])        
    })
  }

  private invoiceJobModel(jobDetails?: any): FormGroup {
    let item_code = (typeof jobDetails !== 'undefined') ? jobDetails.item_code : '';
    let item_name = (typeof jobDetails !== 'undefined') ? jobDetails.item_name : '';
    let job_no = (typeof jobDetails !== 'undefined') ? jobDetails.job_no : '';
    let qty = (typeof jobDetails !== 'undefined') ? jobDetails.qty : '';
    let rate = (typeof jobDetails !== 'undefined') ? jobDetails.rate : '';

    return new FormGroup({
      item_code: new FormControl(item_code, [Validators.required]),
      item_name: new FormControl(item_name, [Validators.required]),
      job_no: new FormControl(job_no, [Validators.required]),
      sac_code: new FormControl(''),
      qty: new FormControl(qty, [Validators.required]),
      nos: new FormControl('NOS'),
      rate: new FormControl(rate, [Validators.required]),
      taxable_total: new FormControl(''),
      cgst: new FormControl('9.00', [Validators.required]),
      cgst_amount: new FormControl(''),
      sgst: new FormControl('9.00', [Validators.required]),
      sgst_amount: new FormControl(''),
      gst_calculated_amount: new FormControl(''),
    })
  }

  addJob(): void {
    $('.ordersModal').modal('show');
  }

  selectedOrders(ids: Array<number>) {
    this.selectedOrderIds = ids;
  }

  addSelectedJobOrders(): void {
    if (this.selectedOrderIds.length > 0) {
      this.waitJobAdding = true;
      
      let selectedOrder = this.selectedOrderIds[0];
      let jobDetails: any = {};

      this.toastCtrl.show({ type: 'loading', title: 'Please wait', autoHide: false });

      this.ordersService.getOrder(selectedOrder).subscribe((orderData: any) => {  
        orderData = orderData.order;
        jobDetails.item_code = orderData.order_item_code;
        jobDetails.job_no = orderData.order_job_no;
        jobDetails.qty = orderData.order_quantity;

        this.masterService.getMasterItemByCode(jobDetails.item_code).subscribe((itemData: any) => {
          itemData = itemData.item;
          jobDetails.item_name = itemData.item_name;
          jobDetails.rate = itemData.item_rate;

          this.orderJobs.push(this.invoiceJobModel(jobDetails));
          $('.ordersModal').modal('hide');
          $('.ordersModal input[type="radio"]').prop('checked', false);
          this.selectedOrderIds = [];
          
          this.waitJobAdding = false;
          this.toastCtrl.hide();
          this.toastCtrl.show({ type: 'success', title: 'Success', message: 'Order Job Added Successfully !!!' });
        }, (error) => {
          this.errorMessageAddingOrder(error);
        });
      }, (error) => {
        this.errorMessageAddingOrder(error);
      });
    } else {
      this.toastCtrl.show({ type: 'error', title: 'Error', message: 'Please select at least one WIP Job No. !!!' });
    }
  }

  errorMessageAddingOrder(error?: any) {
    $('.ordersModal').modal('hide');
    $('.ordersModal input[type="radio"]').prop('checked', false);
    this.waitJobAdding = false;
    this.toastCtrl.hide();
    
    const message = (typeof error !== 'undefined' 
    && typeof error.message !== 'undefined' 
    && error.message !== '') ? error.message : 'Error while adding order job, please try again !!!';

    this.toastCtrl.show({ type: 'error', title: 'Error', message: message });
  }

  removeJob(index: number): void {
    this.orderJobs.removeAt(index);
  }

  get jobNumbers(): string {
    let numbers = [];
    this.orderJobs.controls.forEach((job) => {
      if (job.get('job_no').value.trim() !== '') {
        numbers.push(job.get('job_no').value);
      }
    });

    return numbers.join(', ');
  }

  get taxableTotalAmount(): number {
    let total = 0;
    this.orderJobs.controls.forEach((job) => {
      total = total + job.get('taxable_total').value;
    });
    this.invoiceForm.get('taxable_total_amount').setValue(total);
    return total;
  }

  get cGstAmount(): number {
    let total = 0;
    this.orderJobs.controls.forEach((job) => {
      total = total + job.get('cgst_amount').value;
    });
    this.invoiceForm.get('cgst_total_amount').setValue(total);
    return total;
  }

  get sGstAmount(): number {
    let total = 0;
    this.orderJobs.controls.forEach((job) => {
      total = total + job.get('sgst_amount').value;
    });
    this.invoiceForm.get('sgst_total_amount').setValue(total);
    return total;
  }

  get gstTotalAmount(): number {
    let total = 0;
    this.orderJobs.controls.forEach((job) => {
      total = total + job.get('gst_calculated_amount').value;
    });
    this.invoiceForm.get('gst_total_amount').setValue(total);
    if (total !== 0) {
      this.invoiceForm.get('gst_total_amount_words').setValue(this.utilites.convertNumberToWords(total));
    }
    return total;
  }
  
  saveInvoice({ value, valid }: { value: any, valid: boolean }): void {
    if (!valid) {
      this.invoiceForm.markAsDirty();      
    } else {
      this.invoiceForm.markAsPristine();
      this.waitFlag = true;
      console.log(value);

      setTimeout(() => {
        this.waitFlag = false;
      }, 1000);
    }
  }

  print() {
    window.print();
  }

}

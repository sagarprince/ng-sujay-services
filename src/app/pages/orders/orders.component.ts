// Core
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { OrderModel } from './orders.models';
import { ColumnsModel } from '../../shared/modules/data-tables/data-tables.models';

// Services
import { CacheService, EmitterService } from '../../shared/services';
import { OrdersService } from './orders.service';
import { OrdersSharedService } from './orders-shared.service';

// Shared Controllers
import { SweetAlertController } from '../../shared/modules/sweet-alert';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  @Input('showHeader') showHeader: boolean = true;

  @Input('addNewOrderBtn') addNewOrderBtn: boolean = true;

  @Input('showActionColumn') showActionColumn: boolean = true;

  @Input('showRowCheckbox') showRowCheckbox: boolean = false;

  @Input('singleRowSelect') singleRowSelect: boolean = true;

  @Input('inModel') inModel: string = 'false';

  @Output('selectedOrders') selectedOrdersEvent = new EventEmitter<any>();

  orders: Array<OrderModel> = [];

  columns: Array<ColumnsModel> = [
    {
      title: 'WIP JOB NO.',
      key: 'order_job_no'
    },
    {
      title: 'ITEM CODE',
      key: 'order_item_code'
    },
    {
      title: 'QUANTITY',
      key: 'order_quantity'
    },
    {
      title: 'DATE',
      key: 'order_date'
    },
    {
      title: 'STATUS',
      key: 'order_status'
    }
  ];

  isAjax: boolean = true;

  editableDatePicker: boolean = true;  

  showSearchBox: boolean = false;

  pagesCount: number = 1;

  currentPage: number = 1;  

  isLoading: boolean = true;

  filterObject: any = {};

  perPage: number = 4;

  orderJobNo: string = '';
  orderItemCode: string = '';
  orderDate: string = '';
  orderStatus: string = '';

  constructor(private _router: Router,
  public ordersService: OrdersService,
  public ordersSharedService: OrdersSharedService,
  public alertCtrl: SweetAlertController) { 
    EmitterService.get('orderDeleted').subscribe((flag: any) => {
      this.setInitialFilterObject();
      this.getOrders();
    });
  }

  ngOnInit() {
    this.setInitialFilterObject();
    this.getOrders();
  }  

  setInitialFilterObject() {
    this.filterObject = {};
    this.currentPage = 1; 
    this.filterObject.page = this.currentPage;
    this.filterObject.per_page = this.perPage;
  }

  getOrders() {
    this.showLoading(); 
    this.ordersService.getOrders(this.filterObject).subscribe((data: any) => {
      this.orders = data.orders;
      this.pagesCount = data.pagesCount;      
      this.hideLoading();
    }, (error) => {
      this.hideLoading();
      this.alertCtrl.open({
          title: 'Server Error',
          message: 'Error while getting master items !!!',
          type: 'error',
          animationType: 'slide-from-bottom'
      }).onApprove(() => {});
    });
  }

  refreshOrders() {
    this.setInitialFilterObject();
    this.resetFilterValues(); 
    this.getOrders();
  }

  paginateRecords(page: number) {    
    this.filterObject.page = page;
    this.currentPage = page;       
    this.getOrders();
  }

  filterRecords(filterValues: any) {    
    this.setInitialFilterObject();
    if (filterValues.length > 0) {      
      filterValues.forEach((filter) => {
        this.filterObject[filter.key] = filter.value;
      });            
    }
    this.getOrders();
  }

  editOrder(id: number) {
    this._router.navigate(['orders/order/edit/' + id]);
  }

  deleteOrder(id: number) {
    this.ordersSharedService.deleteOrder(id, false);
  }

  selectedOrders(orderIds: Array<number>) {
    this.selectedOrdersEvent.emit(orderIds);
  }

  resetFilterValues() {
    this.orderJobNo = '';
    this.orderItemCode = '';
    this.orderDate = '';
    this.orderStatus = '';
  }

  showLoading() {
    this.orders = [];
    this.isLoading = true; 
  }

  hideLoading() {    
    this.isLoading = false;
  }

  ngOnDestroy() {
    EmitterService.get('orderDeleted').unsubscribe();
    EmitterService.destroy('orderDeleted');
  }

}
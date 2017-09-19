// Core
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { ItemModel } from './master.models';
import { ColumnsModel } from '../../shared/modules/data-tables/data-tables.models';

// Services
import { MasterService } from './master.service';
import { MasterSharedService } from './master-shared.service';
import { CacheService, EmitterService } from '../../shared/services';

// Shared Controllers
import { SweetAlertController } from '../../shared/modules/sweet-alert';
import { ToastrController } from '../../shared/modules/toastr';

// Constant
import { Constant } from '../../shared/constants';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit, OnDestroy {

  @Input('showHeader') showHeader: boolean = true;

  @Input('addNewItemBtn') addNewOrderBtn: boolean = true;

  @Input('showActionColumn') showActionColumn: boolean = true;

  @Input('showRowCheckbox') showRowCheckbox: boolean = false;

  @Input('singleRowSelect') singleRowSelect: boolean = true;

  @Input('inModel') inModel: string = 'false';

  @Output('selectedItems') selectedItemsEvent = new EventEmitter<any>();

  checkboxValueKey: string = 'item_code';

  items: Array<ItemModel> = [];

  columns: Array<ColumnsModel> = [
    {
      title: 'ITEM CODE',
      key: 'item_code'
    },
    {
      title: 'ITEM NAME',
      key: 'item_name'
    },
    {
      title: 'QUANTITY',
      key: 'item_quantity'
    },
    {
      title: 'RATE',
      key: 'item_rate'
    }
  ];

  isAjax: boolean = true;

  enterprises: Array<string> = Constant['enterprises'];

  showSearchBox: boolean = false;

  pagesCount: number = 1;

  currentPage: number = 1;  

  isLoading: boolean = true;

  filterObject: any = {};

  perPage: number = 4;

  itemCode: string = '';
  itemName: string = '';
  itemEnterprise: string = '';

  constructor(private _router: Router,
  private masterService: MasterService, 
  public masterSharedService: MasterSharedService,
  public alertCtrl: SweetAlertController,
  public toastCtrl: ToastrController) {
      EmitterService.get('itemDeleted').subscribe((flag) => {
        this.setInitialFilterObject();
        this.getMasterItems();
      });
  }

  ngOnInit() {
    this.setInitialFilterObject();
    this.getMasterItems();
  }
  
  setInitialFilterObject() {
    this.filterObject = {};
    this.currentPage = 1; 
    this.filterObject.page = this.currentPage;
    this.filterObject.per_page = this.perPage;
  }

  getMasterItems() {   
    this.showLoading(); 
    this.masterService.getItems(this.filterObject).subscribe((data: any) => {      
      this.items = data.items;
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

  refreshMasterItems() {        
    this.setInitialFilterObject();
    this.resetFilterValues(); 
    this.getMasterItems(); 
  }

  paginateRecords(page: number) {    
    this.filterObject.page = page;
    this.currentPage = page;       
    this.getMasterItems();
  }

  filterRecords(filterValues: any) {    
    this.setInitialFilterObject();
    if (filterValues.length > 0) {      
      filterValues.forEach((filter) => {
        this.filterObject[filter.key] = filter.value;
      });            
    }
    this.getMasterItems();
  }

  editItem(id: number) {    
    this._router.navigate(['master/item/edit/' + id]);
  }

  deleteItem(id: number) { 
    this.masterSharedService.deleteItem(id, false);
  }

  selectedItems(itemIds: Array<number>) {
    this.selectedItemsEvent.emit(itemIds);
  }

  resetFilterValues() {
    this.itemCode = '';
    this.itemName = '';
    this.itemEnterprise = '';
  }

  showLoading() {
    this.items = [];
    this.isLoading = true; 
  }

  hideLoading() {    
    this.isLoading = false;
  }

  ngOnDestroy() {
    EmitterService.get('itemDeleted').unsubscribe();
    EmitterService.destroy('itemDeleted');
  }

}

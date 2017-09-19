import { 
  Component, OnInit, OnChanges, OnDestroy, AfterViewInit, 
  Input, Output, EventEmitter, ContentChildren, 
  QueryList, ElementRef, ViewEncapsulation
} from '@angular/core';

import { ColumnsModel } from './data-tables.models';

import * as Sifter from './sifter';

@Component({
  selector: 'data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DataTablesComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input() columns: Array<ColumnsModel> = []; 

  @Input() rows: Array<any> = [];

  @Input() showRowCheckbox: boolean = false;

  @Input() singleRowSelect: boolean = false;

  @Input() checkboxValueKey: string = 'id';

  @Input() showSearchBox: boolean = true;

  @Input() showActionColumn: boolean = true;

  @Input() isAjax: boolean = false;

  @Input() pagesCount: number = 1;

  @Input() currentPage: number = 1;

  @Input('isLoading') loading: boolean = true;

  @Output('refreshRecords') refreshEvent = new EventEmitter<any>();

  @Output('editRecord') editEvent = new EventEmitter<any>();

  @Output('deleteRecord') deleteEvent = new EventEmitter<any>();

  @Output('paginateRecords') paginateRecordsEvent = new EventEmitter<any>();

  @Output('filterRecords') filterRecordsEvent = new EventEmitter<any>();

  @Output('selectedRows') selectedRowsEvent = new EventEmitter<any>();

  @ContentChildren('searchRecordsInputs') _searchRecordsInputEl: QueryList<ElementRef>;

  filterByCol: string = '';

  searchInput: string = '';

  allRows: Array<any> = [];

  searchRows: any = [];

  paginateRows: Array<any> = [];  

  perPage: number = 10;  

  columnsCount: number = 1;

  checkedRows: Array<number> = [];

  constructor() { 
    
  }

  ngOnInit() {
    if (this.showRowCheckbox === true) {
      this.columnsCount = 2;
    }
  }

  ngAfterViewInit() {
    
  }

  ngOnChanges(changes: any) {   
    if (changes && typeof changes.rows !== 'undefined') {
      this.searchRows = new Sifter(this.rows);
      this.allRows = this.rows;
      this.paginateRows = this.rows;
      this.filterByCol = (this.columns.length > 0) ? this.columns[0].key : '';      

      if (changes.rows.isFirstChange() === false && this.isAjax === false) {
        this.loading = false;
      }

      this.makePagination();
    }
  }

  makePagination() {
    if (this.isAjax === false) {
      this.pagesCount = Math.ceil(this.rows.length / this.perPage);
      this.paginateRecords(1);
    }    
  }

  getColumnsKeys() {
    let keys = [];
    if(this.columns.length > 0) {
      for (let i = 0; i < this.columns.length; i++) {
        keys.push(this.columns[i].key);
      }
    }

    return keys;
  }

  getCheckedRows(event, id) {
    if (event.target.checked === true) {
      if (this.singleRowSelect === true) {
        this.checkedRows = [];
      }
      this.checkedRows.push(id);
    } else {
      let index = this.checkedRows.indexOf(id);  
      if (index > -1) {
        this.checkedRows.splice(index, 1);
      }
    }
    this.selectedRowsEvent.emit(this.checkedRows);
  }

  /**
   * Search Records
   *
   * @method searchRecords
   */
  filterRecords() {
    let searchValues: Array<any> = [];

    if (this.isAjax === false) {   
      if (this.searchInput.trim() !== '') {
        searchValues.push(this.searchInput.trim().toLowerCase());
      }

      this._searchRecordsInputEl.forEach((el: ElementRef) => {
        searchValues.push(el.nativeElement.value);
      });    

      let search = searchValues.join(' ').trim();        
  
      let searchResult = this.searchRows.search(search, {
        fields: this.getColumnsKeys(),
        conjunction: 'and'
      });

      this.rows = [];

      searchResult.items.forEach((item: any) => {
        this.rows.push(this.allRows[item.id]);
      });

      this.paginateRows = this.rows;
      this.makePagination();
    } else {
      this._searchRecordsInputEl.forEach((el: ElementRef) => {
        const key = el.nativeElement.getAttribute('data-prop');
        const value = el.nativeElement.value.trim();
        if (value !== '') {
          searchValues.push({
            key: key,
            value: value
          });
        }              
      });
      this.filterRecordsEvent.emit(searchValues);
    }
  }

  /**
   * Paginate Records
   * 
   * @param pageNumber
   * @method paginateRecords
   */
  paginateRecords(pageNumber) {
    if (this.isAjax === false) {
      --pageNumber;
      this.rows = this.paginateRows.slice(pageNumber * this.perPage, (pageNumber + 1) * this.perPage);
    } else {
      this.paginateRecordsEvent.emit(pageNumber);
    }   
  }

  /**
   * Refresh Records
   * 
   * @method refresh
   */  
  refresh() {
    if (this.isAjax === false) {
      this.loading = true;      
    }
    this.rows = [];
    this.allRows = [];
    this.refreshEvent.emit();
  }

  /**
   * Edit Record
   * 
   * @method edit
   */
  edit(id) {
    this.editEvent.emit(id);
  }

  /**
   * Delete Record
   * 
   * @method Delete
   */
  delete(id) {
    this.deleteEvent.emit(id);
  }

  ngOnDestroy() {
    
  }

}

import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'data-table-pagination',
  templateUrl: './data-tables-pagination.component.html',
  styleUrls: ['./data-tables-pagination.component.scss']
})
export class DataTablesPaginationComponent implements OnChanges {

  @Input() pagesCount: number = 1;

  @Input() currentPage: number = 1;

  @Output('paginateRecords') paginateEvent = new EventEmitter();

  pages: Array<number> = [];  

  editPageNumber: boolean = false; 

  constructor() { }

  ngOnChanges(changes: any) {
    if (changes && typeof changes.pagesCount !== 'undefined') {      
      this.pages = [];
      this.currentPage = 1;
      this.editPageNumber = false;
      for(let i = 1; i <= this.pagesCount; i++) {
        this.pages.push(i);
      }
    }
  }

  selectPage(pageNumber: any) {    
    if (pageNumber !== '' && pageNumber <= this.pagesCount && pageNumber !== this.currentPage) {
      this.currentPage = parseInt(pageNumber, 10);
      this.paginateEvent.emit(pageNumber);
    }
    this.editPageNumber = false;
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.selectPage(this.currentPage-1);
    }
    this.editPageNumber = false;
  }

  nextPage() {
    if (this.pagesCount !== this.currentPage) {
      this.selectPage(this.currentPage+1);
    }
    this.editPageNumber = false;
  }

}

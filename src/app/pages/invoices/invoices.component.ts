// Core
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { IModel } from './invoices.model';
import { ColumnsModel } from '../../shared/modules/data-tables/data-tables.models';

// Services
import { CacheService, EmitterService } from '../../shared/services';
// import { NrEnterpriseService } from './invoice.service';

// Shared Controllers
import { SweetAlertController } from '../../shared/modules/sweet-alert';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoices: Array<IModel> = [];

  columns: Array<ColumnsModel> = [
    {
      title: 'INVOICE NO.',
      key: 'invoice_no'
    },
    {
      title: 'DATE',
      key: 'invoice_date'
    },
    {
      title: 'TOTAL AMOUNT',
      key: 'invoice_total_amount'
    }
  ];

  editableDatePicker: boolean = true; 

  showRowCheckbox: boolean = true;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.invoices = [
        {
          id: 1,
          invoice_no: '01',
          invoice_date: '14-08-2017',
          invoice_total_amount: 14000
        },
        {
          id: 2,
          invoice_no: '02',
          invoice_date: '15-08-2017',
          invoice_total_amount: 12000
        },
        {
          id: 3,
          invoice_no: '03',
          invoice_date: '16-08-2017',
          invoice_total_amount: 19000
        }
      ];
    }, 600);
  }

  refreshInvoices() {
    setTimeout(() => {
      this.invoices = [];
    }, 600);
  }

  editInvoice(id: number) {

  }

  deleteInvoice(id: number) {

  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: '[jobDetailsRow]',
  templateUrl: './job-details-row.component.html',
  styleUrls: ['./job-details-row.component.scss']
})
export class JobDetailsRowComponent implements OnInit {

  @Input('invoiceFormGroup') invoiceForm: FormGroup;

  @Input('viewMode') viewMode: boolean;

  @Input('jobDetailsRow') job: any;

  @Input('srNo') srNo: number = 1;

  @Output('removeJob') removeJobEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    
  }

  calculateTotal(): number {
    let total = this.job.controls.qty.value * this.job.controls.rate.value;
    this.job.controls.taxable_total._value = total;
    return total;
  }

  calculateCGst(): number {
    let cGstAmount = ( this.calculateTotal() * this.job.controls.cgst.value ) / 100;
    this.job.controls.cgst_amount._value = cGstAmount;
    return cGstAmount;
  }

  calculateSGst(): number {
    let sGstAmount = ( this.calculateTotal() * this.job.controls.sgst.value ) / 100;
    this.job.controls.sgst_amount._value = sGstAmount;
    return sGstAmount;
  }

  calculateTotalWithGst(): number {
    let totalAmountWithGst = this.calculateTotal() + this.calculateCGst() + this.calculateSGst();
    this.job.controls.gst_calculated_amount._value = totalAmountWithGst;
    return totalAmountWithGst;
  }

  removeJob(index: number): void {
    this.removeJobEvent.emit(index);
  }

}

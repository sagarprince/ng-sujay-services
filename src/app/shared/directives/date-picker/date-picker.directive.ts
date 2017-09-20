import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import * as flatpickr from './flatpickr';

@Directive({
  selector: '[datePicker]'
})
export class DatePickerDirective implements OnInit, OnDestroy {

  flatpickr: any = flatpickr;

  @Input('dateFormat') _dateFormat: string = 'd-m-Y';

  @Input('enableTime') _enableTime: boolean = false;

  @Input('allowInput') _allowInput: boolean = false;

  @Input('noCalendar') _noCalendar: boolean = false;

  nativeElement:HTMLElement;

  _datePickerInstance: any = null;

  constructor(private _el: ElementRef) {    
    
  }

  ngOnInit() {
    console.log(this.convertToBoolean(this._enableTime));
    console.log(this.convertToBoolean(this._noCalendar));
    this._datePickerInstance = this._el.nativeElement.flatpickr({
      dateFormat: this._dateFormat,
      enableTime: this.convertToBoolean(this._enableTime),
      allowInput: this._allowInput,
      noCalendar: this.convertToBoolean(this._noCalendar)
    });
  }

  convertToBoolean(value: any) {
    if (typeof value === 'string') {
      if (value === 'true') {
        return true;
      } else {
        return false;
      }
    }
  }

  ngOnDestroy() {    
    if (this._datePickerInstance !==  null) {
      this._datePickerInstance.destroy();
    }
  }

}

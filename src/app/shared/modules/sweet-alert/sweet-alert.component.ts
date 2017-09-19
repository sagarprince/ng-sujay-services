// Core Modules
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer } from '@angular/core';

// Service
import { EmitterService } from '../../services';

// Config Model
import { ConfigModel } from './models';

@Component({
  selector: 'sweet-alert',
  templateUrl: './sweet-alert.component.html',
  styleUrls: ['./sweet-alert.component.scss']
})
export class SweetAlertComponent implements OnInit, OnDestroy {

  @ViewChild('sweetAlertOverlay') _sweetAlertOverlayEl: ElementRef; 

  @ViewChild('sweetAlert') _sweetAlertEl: ElementRef; 

  @Input() title: string;

  @Input() message: string;

  @Input() type: string = 'info'; // error, warning, success, info

  @Input() isConfirm: boolean = false;

  @Input() okButtonText: string = 'Ok'; 

  @Input() cancelButtonText: string = 'Cancel'; 

  @Input() showCancelButton: boolean = false; 

  @Input() animationType: string = 'slide-from-top'; // none, slide-from-top, slide-from-bottom
  @Output() approve  = new EventEmitter();

  @Output() deny = new EventEmitter();
  

  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    
  }

  setConfig(config: ConfigModel) {
    this.title = config.title;
    this.message = config.message;
    this.type = (typeof config.type !== 'undefined') ? config.type : this.type;
    this.animationType = (typeof config.animationType !== 'undefined') ? config.animationType : this.animationType;
    this.isConfirm = (typeof config.isConfirm !== 'undefined') ? config.isConfirm : this.isConfirm;
    this.okButtonText = (typeof config.okButtonText !== 'undefined') ? config.okButtonText : this.okButtonText;
    this.cancelButtonText = (typeof config.cancelButtonText !== 'undefined') ? config.cancelButtonText : this.cancelButtonText;
    this.showCancelButton = (typeof config.showCancelButton !== 'undefined') ? config.showCancelButton : this.showCancelButton;
  }

  show() {
    this._sweetAlertOverlayEl.nativeElement.style.display = 'block';
    this._sweetAlertEl.nativeElement.style.display = 'block';
  }

  hide() {
    this._sweetAlertOverlayEl.nativeElement.style.display = 'none';
    this._sweetAlertEl.nativeElement.style.display = 'none';      
  }

  onOk() {
    this._sweetAlertEl.nativeElement.classList = 'sweet-alert hideSweetAlert';
    this.renderer.listen(this._sweetAlertEl.nativeElement, 'animationend', (event) => {      
      this.hide();
      this.approve.emit('close');      
    });
  }

  onCancel() {
    this._sweetAlertEl.nativeElement.classList = 'sweet-alert hideSweetAlert';
    this.renderer.listen(this._sweetAlertEl.nativeElement, 'animationend', (event) => {      
      this.hide();
      this.deny.emit('close');
    });
  }

  ngOnDestroy() {        
    // console.log('sweet alert component destroy');
  }

}

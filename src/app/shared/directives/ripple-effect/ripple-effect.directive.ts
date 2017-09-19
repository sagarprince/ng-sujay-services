import { Directive, ElementRef, EventEmitter, Input } from '@angular/core';

import { AnimationBuilder, style, animate } from '@angular/animations';

@Directive({
  selector: '[rippleEffect]',  
  host: {
    '(click)': 'onClick($event)',
    '[style.overflow]' : "'hidden'"
  },
  
})
export class RippleEffectDirective { 

  @Input('rippleEffect') rcolor: string = 'white';

  nativeElement:HTMLElement;

  ripple:HTMLSpanElement;

  constructor(private _builder: AnimationBuilder, private _e: ElementRef) {
   this.nativeElement = this._e.nativeElement;
   console.log('ripple-effect');
  }

  onClick(event:any) {

    let clientHeight = this.nativeElement.clientHeight;
    let xOffset= +event.offsetX - 2;
    let yOffset= +event.offsetY - 2;

    this.ripple = document.createElement('span');
    const styleString = 'position:absolute;top:'+yOffset+'px;left:'+xOffset+'px; width: 5px;height: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;background: '+this.rcolor+';opacity: .2;  transition-timing-function:ease-out';    
    this.ripple.setAttribute('style', styleString);

    this.nativeElement.appendChild(this.ripple);

    let clientWidth = this.nativeElement.clientWidth;

    const rippleAnimation = this._builder.build([
      style({width: '5px', height: '5px', top: yOffset+'px', left: xOffset+'px'}),
      animate(400, style({width: clientWidth*2+'px', height: clientWidth*2+'px', top: +event.offsetY-(clientWidth)+'px', left: +event.offsetX-(clientWidth)+'px'}))
    ]);     

    rippleAnimation.create(this.ripple).play();

    setTimeout(() => {
      this.nativeElement.removeChild(this.ripple);
    }, 600);    
  }

}

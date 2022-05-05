import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[cbg]'
})
export class CbgDirective {

  constructor(private el:ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'red';
   }
}

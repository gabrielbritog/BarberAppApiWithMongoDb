import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { GlobalVariables } from '../../Helpers/GlobalVariables';

@Directive({
  selector: '[appMiscConditions]'
})
export class MiscConditionsDirective {
  private intervalId: any;
  private isRemoved = false;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}

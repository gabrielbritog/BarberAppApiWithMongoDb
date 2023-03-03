import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyCursor]'
})
export class CurrencyCursorDirective {

  constructor(private el: ElementRef) {}

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    const input = this.el.nativeElement;
    input.setSelectionRange(input.value.length, input.value.length);
  }


}

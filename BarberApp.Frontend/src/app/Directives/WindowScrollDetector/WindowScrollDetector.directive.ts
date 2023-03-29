import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appWindowScrollDetector]'
})
export class WindowScrollDetectorDirective {
  private _scrolledUp = false;
  private previousScrollPosition = 0;

  constructor(private elementRef: ElementRef) {}

  get scrolledUp(): boolean {
    return this._scrolledUp;
  }

  set scrolledUp(value: boolean) {
    this._scrolledUp = value;
  }

  @HostListener('window:scroll') onScroll() {
    this.scrolledUp = window.scrollY < this.previousScrollPosition;
    this.previousScrollPosition = window.scrollY;
  }
}

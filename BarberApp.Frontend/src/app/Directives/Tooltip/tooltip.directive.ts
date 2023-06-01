import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') text: string = '';
  tooltipElement?: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  showTooltip() {
    if (!this.tooltipElement) {
      this.tooltipElement = this.renderer.createElement('div');
      this.renderer.addClass(this.tooltipElement, 'tooltip');
      this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.text));
      this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    }
  }

  hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = undefined;
    }
  }
}

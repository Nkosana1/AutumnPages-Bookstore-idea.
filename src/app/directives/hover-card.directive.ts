import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverCard]',
  standalone: true
})
export class HoverCardDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'shadow-2xl');
    this.renderer.addClass(this.el.nativeElement, '-translate-y-2');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'shadow-2xl');
    this.renderer.removeClass(this.el.nativeElement, '-translate-y-2');
  }
}


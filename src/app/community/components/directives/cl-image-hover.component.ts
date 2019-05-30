import {
    Directive,
    Renderer,
    HostListener,
    HostBinding,
    ElementRef
} from '@angular/core';

@Directive({
  selector: '[cl-image-hover]'
})
export class CLImageHoverDirectiveComponent {
  constructor (
    private el: ElementRef,
    private renderer: Renderer) {
  }

  @HostListener('mouseover') private onMouseOver (): void {
    let part = this.el.nativeElement;
  }

  @HostListener('mouseout') private onMouseOut (): void {
    let part = this.el.nativeElement;
  }
}

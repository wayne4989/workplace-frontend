import {
  Directive,
  ElementRef,
  Input,
  HostListener
} from '@angular/core';

@Directive({ selector: '[sticky]' })
export class StickyDirective {
  constructor (private el: ElementRef) {
    this.stickPoint = this.getDistance();
  }

  private stuck = false;
  private stickPoint: any;

  @HostListener('window:scroll', ['$event'])
  private onScroll (event): any {
    const distance = this.getDistance() - window.pageYOffset;
    const offset = window.pageYOffset;

    if ((distance <= 0) && !this.stuck) {
      this.el.nativeElement.style.position = 'fixed';
      this.el.nativeElement.style.top = '0px';
      this.stuck = true;
    } else if (this.stuck && (offset <= this.stickPoint)) {
      this.el.nativeElement.style.position = 'static';
      this.stuck = false;
    }
  }

  private getDistance (): any {
    return this.el.nativeElement.offsetTop;
  }
}

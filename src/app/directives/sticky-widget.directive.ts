import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  AfterViewInit
} from '@angular/core';

@Directive({ selector: '[stickyWidget]' })
export class StickyWidgetDirective implements AfterViewInit {
  constructor (private el: ElementRef) {}

  private stuck = false;
  private fullHeight: any;
  private stickPoint: any;
  private offsetTop = 0;
  private width;
  private height = 0;
  private pageYOffset = 0;
  private navBarHeight = 66;

  public ngAfterViewInit (): void {
    const box = this.el.nativeElement.getBoundingClientRect();
    this.height = box.height;
    this.width = box.width;
    this.offsetTop = box.top;
    this.fullHeight = this.height + this.offsetTop + window.pageYOffset;
    this.pageYOffset = window.pageYOffset;
  }


  @HostListener('window:scroll', ['$event'])
  private onScroll (event): void {
    if (window.innerWidth < 768) {
      return;
    }

    const offset = window.pageYOffset + window.innerHeight;
    const fullHeight = this.getFullHeight();

    if (this.width === undefined) {
      this.width = this.getWidth();
    }

    if (fullHeight > window.innerHeight) {

      if ((offset > fullHeight) && !this.stuck) {
        this.el.nativeElement.style.position = 'fixed';
        this.el.nativeElement.style.bottom = '0px';
        this.el.nativeElement.style.width = `${this.width}px`;
        this.stuck = true;
      } else if (this.stuck && (offset <= fullHeight)) {
        this.el.nativeElement.style.position = 'static';
        this.stuck = false;
      }

    } else {
      if ((window.pageYOffset > this.offsetTop - this.navBarHeight) && !this.stuck) {
        this.el.nativeElement.style.position = 'fixed';
        this.el.nativeElement.style.top = this.navBarHeight + 'px';
        this.el.nativeElement.style.width = `${this.width}px`;
        this.stuck = true;
      } else if (this.stuck && (window.pageYOffset <= this.offsetTop - this.navBarHeight)) {
        this.el.nativeElement.style.position = 'static';
        this.stuck = false;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  private onResize (event): void {
    this.el.nativeElement.style.width = '';
    this.width = this.getWidth();
  }

  private getFullHeight (): number {
    const box = this.el.nativeElement.getBoundingClientRect();
    return box.height + this.offsetTop + this.pageYOffset;
  }

  private getWidth (): number {
    const box = this.el.nativeElement.getBoundingClientRect();
    return box.width;
  }
}

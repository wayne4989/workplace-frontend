import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  Renderer2,
  Inject,
  AfterViewInit
} from '@angular/core';

/**
 * @Todo
 * Should work also at resize event
 */
@Directive({ selector: '[sticky]' })
export class SharedStickyDirective implements AfterViewInit {
  constructor (
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(Window) private window: Window
  ) {}

  private stuck = false;
  private stickPoint: number;
  private clientHeight: number;

  public ngAfterViewInit (): void {
    this.stickPoint = this.getDistance();
    this.clientHeight = this.getClientheight();
  }

  @HostListener('window:scroll', ['$event'])
  private onScroll (event): any {
    const distance = this.getDistance() - window.pageYOffset;
    const offset = window.pageYOffset;

    let container = this.window.document.querySelector('.index-community-page-component');

    if ((distance <= 0) && !this.stuck) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
      this.renderer.setStyle(this.el.nativeElement, 'top', 0);
      this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
      this.renderer.setStyle(this.el.nativeElement, 'z-index', 1);
      this.renderer.setStyle(container, 'padding-top', `${this.clientHeight}px`);
      this.stuck = true;
    } else if (this.stuck && (offset <= this.stickPoint)) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'static');
      this.renderer.setStyle(container, 'padding-top', 0);
      this.stuck = false;
    }
  }

  private getDistance (): number {
    return this.el.nativeElement.offsetTop;
  }

  private getClientheight (): number {
    return this.el.nativeElement.clientHeight;
  }
}

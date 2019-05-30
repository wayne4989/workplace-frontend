import {
    Directive,
    Renderer2,
    HostListener,
    ElementRef,
    Inject
} from '@angular/core';

@Directive({
  selector: '[onResizeActive]'
})
export class IndexOnResizeActiveDirectiveComponent {
  constructor (
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(Window) private window: Window) {}

  public ngAfterViewInit (): void {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', ['$event'])
  private onWindowScroll (): void {
    let windowTop = this.window.scrollY;
    let communityStickyNavbar = this.el.nativeElement.querySelector('.community-show-sticky');
    let community = this.el.nativeElement.querySelector('.index-community-page-component');
    let trendingNow = this.el.nativeElement.querySelector('.index-trending-now-page-component');
    let leisure = this.el.nativeElement.querySelector('.index-leisure-page-component');

    let addActiveClassInCommunity = this.el.nativeElement.querySelector('.index-sticky-navbar-component .community');
    let addActiveClassInTrendingNow = this.el.nativeElement.querySelector('.index-sticky-navbar-component .trending-now');
    let addActiveClassInLeisure = this.el.nativeElement.querySelector('.index-sticky-navbar-component .leisure');
    let removeActiveClass = this.el.nativeElement.querySelectorAll('.index-sticky-navbar-component .sticky-menu li');
    let addStickyClassiInCommunity = this.el.nativeElement.querySelector('.index-community-page-component index-sticky-navbar-component');

    if (windowTop >= community.offsetTop) {
      this.renderer.addClass(addStickyClassiInCommunity, 'sticky-navbar-fixed');
    } else {
      this.renderer.removeClass(addStickyClassiInCommunity, 'sticky-navbar-fixed');
    }

    if (((windowTop) >= community.offsetTop)
    && (windowTop <= (community.offsetTop + (community.clientHeight - communityStickyNavbar.clientHeight)))) {
      removeActiveClass.forEach(element => {
        this.renderer.removeClass(element, 'active');
      });
      this.renderer.addClass(addActiveClassInCommunity, 'active');
    } else if ((windowTop + communityStickyNavbar.clientHeight) >= (trendingNow.offsetTop)
    && windowTop <= (trendingNow.offsetTop + (trendingNow.clientHeight - communityStickyNavbar.clientHeight))) {
      removeActiveClass.forEach(element => {
        this.renderer.removeClass(element, 'active');
      });
      this.renderer.addClass(addActiveClassInTrendingNow, 'active');
    }  else if ((windowTop + communityStickyNavbar.clientHeight) >= (leisure.offsetTop)
    && windowTop <= (leisure.offsetTop + (leisure.clientHeight - communityStickyNavbar.clientHeight))) {
      removeActiveClass.forEach(element => {
        this.renderer.removeClass(element, 'active');
      });
      this.renderer.addClass(addActiveClassInLeisure, 'active');
    } else {
      removeActiveClass.forEach(element => {
        this.renderer.removeClass(element, 'active');
      });
    }
  }
}

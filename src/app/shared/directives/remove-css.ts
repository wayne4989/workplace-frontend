import {
  Directive,
  Renderer2,
  Inject,
  OnDestroy,
  Input
} from '@angular/core';

/**
 * @Todo
 * Should work also at resize event
 */
@Directive({ selector: '[remove-css]' })
export class SharedRemoveCssDirective implements OnDestroy {
  constructor (
    private renderer: Renderer2,
    @Inject(Window) private window: Window
  ) {}

  @Input() protected cssToRemove: string;

  public ngOnDestroy (): void {
    this.renderer.removeClass(this.window.document.body, this.cssToRemove);
  }
}

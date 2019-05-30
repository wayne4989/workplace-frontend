import {
  Directive,
  Renderer2,
  Inject,
  OnDestroy,
  Input,
  OnInit
} from '@angular/core';

/**
 * @Todo
 * Should work also at resize event
 */
@Directive({ selector: '[add-css]' })
export class SharedAddCssDirective implements OnInit {
  constructor (
    private renderer: Renderer2,
    @Inject(Window) private window: Window
  ) {}

  @Input() protected cssToAdd: string;

  public ngOnInit (): void {
    this.renderer.addClass(this.window.document.body, this.cssToAdd);
  }
}

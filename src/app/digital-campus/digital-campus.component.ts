import {
  Component,
  Inject,
  AfterViewInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'digital-campus-component',
  templateUrl: './digital-campus.component.html',
  styleUrls: ['./digital-campus.component.scss']
})
export class DigitalCampusComponent implements AfterViewInit {
  constructor (
    @Inject(Window) private window: Window,
    private activedRoute: ActivatedRoute) { }

  protected section: string = 'institutions';
  private container;

  public ngAfterViewInit (): void {
    this.activedRoute.fragment.subscribe((fragment: string) => {
      this.container = this.window.document.querySelector(`#${fragment}`);
      if (this.container) {
        setTimeout(() => {
          this.container.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest'});
        }, 1000);
      }
    });
  }
}

import {
  Component,
  Inject
} from '@angular/core';

@Component({
  selector: 'index-service-page-component',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class IndexServicePageComponent {
  constructor (
    @Inject(Window) private window: Window
  ) {}

  protected gotoSection (section): void {
    let container = this.window.document.querySelector(`#${section}`);
    container.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  }
}

import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  ngxZendeskWebwidgetService,
} from 'ngx-zendesk-webwidget';

@Component({
  selector: 'contact-us-component',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnDestroy {
  constructor (
    private zendeskWebwidgetService: ngxZendeskWebwidgetService
  ) {
    zendeskWebwidgetService.identify({
     name: 'Info@peersview.com',
     email: 'Peersview-40'
   });
    this.zendeskWebwidgetService.show();
  }

  public ngOnDestroy (): void {
    this.zendeskWebwidgetService.hide();
  }
}

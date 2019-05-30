/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  ContactUsComponent
} from './contact-us.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  contactUsRouting
} from './contact-us-routing.component';
import {
  ngxZendeskWebwidgetModule,
  ngxZendeskWebwidgetConfig
} from 'ngx-zendesk-webwidget';

export class ZendeskConfig extends ngxZendeskWebwidgetConfig {
  public accountUrl = 'peersviewhelp.zendesk.com';
  public beforePageLoad (zE): void {
    zE.setLocale('en');
    zE.hide();
  }
}

@NgModule({
  imports : [
    SharedModule,
    contactUsRouting,
    ngxZendeskWebwidgetModule.forRoot(ZendeskConfig)
  ],
  declarations : [
    ContactUsComponent
  ],
  exports: [ngxZendeskWebwidgetModule]
})
export class ContactUsModule {}

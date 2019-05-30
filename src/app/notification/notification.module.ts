/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/

import {
  NotificationComponent
} from './notification.component';
import {
  NotificationRightSidebarComponent
} from './right-sidebar/right-sidebar.component';

import {
  SharedModule
} from '../shared/components/shared.module';
import {
  notificationRouting
} from './notification-routing.component';

@NgModule({
  imports : [
    SharedModule,
    notificationRouting
  ],
  declarations : [
    NotificationComponent,
    NotificationRightSidebarComponent
  ],
  exports: []
})
export class NotificationModule {}

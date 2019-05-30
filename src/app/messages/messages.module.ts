/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/

import {
  MessagesComponent
} from './messages.component';

import {
  SharedModule
} from '../shared/components/shared.module';
import {
  messagesRouting
} from './messages-routing.component';
import {
  MessagesLeftSideBarComponent
} from './components/left-sidebar/left-sidebar.component';

@NgModule({
  imports : [
    SharedModule,
    messagesRouting
  ],
  declarations : [
    MessagesComponent,
    MessagesLeftSideBarComponent
  ],
  exports: []
})
export class MessagesModule {}

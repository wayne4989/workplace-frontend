/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  TermsOfUseUserComponent
} from './terms-of-use-user.component';
import {
  termsOfUseUserRouting
} from './terms-of-use-user-routing.component';

@NgModule({
  imports : [
    SharedModule,
    termsOfUseUserRouting
  ],
  declarations : [
    TermsOfUseUserComponent
  ],
  exports: []
})
export class TermsOfUseUserModule {}

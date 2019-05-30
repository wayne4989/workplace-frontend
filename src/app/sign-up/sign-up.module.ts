/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  SignUpComponent
} from './sign-up.component';
import {
  SignUpThankYouComponent
} from './thank-you/thank-you.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  signUpRouting
} from './sign-up-routing.component';

@NgModule({
  imports : [
    SharedModule,
    signUpRouting
  ],
  declarations : [
    SignUpComponent,
    SignUpThankYouComponent
  ],
  exports: []
})
export class SignUpModule {}

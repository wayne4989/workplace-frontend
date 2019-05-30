/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  SignInComponent
} from './sign-in.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  signInRouting
} from './sign-in-routing.component';

@NgModule({
  imports : [
    SharedModule,
    signInRouting
  ],
  declarations : [
    SignInComponent
  ],
  exports: []
})
export class SignInModule {}

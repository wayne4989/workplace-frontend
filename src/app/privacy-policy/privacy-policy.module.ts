/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  PrivacyPolicyComponent
} from './privacy-policy.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  privacyPolicyRouting
} from './privacy-policy-routing.component';

@NgModule({
  imports : [
    SharedModule,
    privacyPolicyRouting
  ],
  declarations : [
    PrivacyPolicyComponent
  ],
  exports: []
})
export class PrivacyPolicyModule {}

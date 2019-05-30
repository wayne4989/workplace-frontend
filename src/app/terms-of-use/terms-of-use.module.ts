/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  TermsOfUseComponent
} from './terms-of-use.component';
import {
  termsOfUseRouting
} from './terms-of-use-routing.component';

@NgModule({
  imports : [
    SharedModule,
    termsOfUseRouting
  ],
  declarations : [
    TermsOfUseComponent
  ],
  exports: []
})
export class TermsOfUseModule {}


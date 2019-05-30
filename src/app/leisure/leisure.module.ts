/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  LeisureComponent
} from './leisure.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  leisureRouting
} from './leisure-routing.component';

@NgModule({
  imports : [
    SharedModule,
    leisureRouting
  ],
  declarations : [
    LeisureComponent
  ],
  exports: [],
  providers: []
})
export class LeisureModule {}

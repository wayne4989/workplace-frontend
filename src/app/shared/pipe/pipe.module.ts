/* angular components */
import {
  NgModule,
} from '@angular/core';
import {
  SharedFilterPipeComponent
} from './filter.pipe';
import {
  SharedLocalDatePipeComponent
} from './local-date.pipe';

@NgModule({
  imports: [],
  declarations: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent
  ],
  exports: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent
  ]
})
export class SharedPipeModule {}

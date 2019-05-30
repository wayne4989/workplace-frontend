/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  AdvanceSearchComponent
} from './advance-search.component';
import {
  AdvanceSearchFindPeopleComponent
} from './find-people/find-people.component';
import {
  AdvanceSearchFindPostComponent
} from './find-post/find-post.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  advanceSearchRouting
} from './advance-search-routing.component';

@NgModule({
  imports : [
    SharedModule,
    advanceSearchRouting
  ],
  declarations : [
    AdvanceSearchComponent,
    AdvanceSearchFindPeopleComponent,
    AdvanceSearchFindPostComponent
  ],
  exports: []
})
export class AdvanceSearchModule {}

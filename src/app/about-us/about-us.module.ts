/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  AboutUsComponent
} from './about-us.component';
import {
  AboutUsIndexPageComponent
} from './index-page/index-page.component';
import {
  AboutUsHowItIsStartedComponent
} from './how-it-is-started/how-it-is-started.component';
import {
  AboutUsCommunityComponent
} from './community/community.component';
import {
  AboutUsTeamComponent
} from './team/team.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  aboutUsRouting
} from './about-us-routing.component';

@NgModule({
  imports : [
    SharedModule,
    aboutUsRouting
  ],
  declarations : [
    AboutUsComponent,
    AboutUsIndexPageComponent,
    AboutUsHowItIsStartedComponent,
    AboutUsCommunityComponent,
    AboutUsTeamComponent
  ],
  exports: []
})
export class AboutUsModule {}

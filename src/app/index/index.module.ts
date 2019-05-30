/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  IndexComponent
} from './index.component';
import {
  IndexFirstPageComponent
} from './components/first-page/first-page.component';
import {
  IndexServicePageComponent
} from './components/service-page/service-page.component';
import {
  IndexCommunityPageComponent
} from './components/community-page/community-page.component';
import {
  IndexTrendingNowPageComponent
} from './components/trending-now-page/trending-now-page.component';
import {
  IndexStickyNavbarComponent
} from './components/sticky-navbar/sticky-navbar.component';
import {
  IndexLeisurePageComponent
} from './components/leisure-page/leisure-page.component';
import {
  IndexOnResizeActiveDirectiveComponent
} from './directives/on-resize-active';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  indexRouting
} from './index-routing.component';
import {
  IndexCommunityScreenshotPageComponent
} from './components/community-screenshot-page/community-screenshot-page.component';

@NgModule({
  imports : [
    SharedModule,
    indexRouting,
  ],
  declarations : [
    IndexComponent,
    IndexFirstPageComponent,
    IndexServicePageComponent,
    IndexCommunityPageComponent,
    IndexTrendingNowPageComponent,
    IndexLeisurePageComponent,
    IndexStickyNavbarComponent,
    IndexOnResizeActiveDirectiveComponent,
    IndexCommunityScreenshotPageComponent
  ],
  exports: []
})
export class IndexModule {}

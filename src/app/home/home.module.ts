/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  HomeComponent
} from './home.component';
import {
  HomeLeftSidebarComponent
} from './components/left-sidebar/left-sidebar.component';
import {
  HomeRightSidebarComponent
} from './components/right-sidebar/right-sidebar.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  homeRouting
} from './home-routing.component';
import {
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';

@NgModule({
  imports : [
    SharedModule,
    PerfectScrollbarModule,
    homeRouting
  ],
  declarations : [
    HomeComponent,
    HomeLeftSidebarComponent,
    HomeRightSidebarComponent
  ],
  exports: [],
  providers: []
})
export class HomeModule {}

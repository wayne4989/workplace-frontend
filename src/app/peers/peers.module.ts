/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from '@cloudinary/angular-5.x';
import {
  Cloudinary
} from 'cloudinary-core';
import {
  PeersComponent
} from './peers.component';
import {
  PeersListComponent
} from './list/list.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  peersRouting
} from './peers-routing.component';

@NgModule({
  imports : [
    SharedModule,
    peersRouting,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'peersview-com' } as CloudinaryConfiguration)
  ],
  declarations : [
    PeersComponent,
    PeersListComponent
  ],
  exports: []
})
export class PeersModule {}

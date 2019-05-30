import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  PeersComponent
} from './peers.component';
import {
  PeersListComponent
} from './list/list.component';

const peersRoutes: Routes = [{
  path: '',
  redirectTo: 'list',
  component: PeersComponent
}, {
  path: 'list',
  component: PeersListComponent
}];

export const peersRouting: ModuleWithProviders = RouterModule.forChild(peersRoutes);

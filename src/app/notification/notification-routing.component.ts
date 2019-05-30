import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  NotificationComponent
} from './notification.component';

const notificationRoutes: Routes = [{
  path: '',
  component: NotificationComponent
}];

export const notificationRouting: ModuleWithProviders = RouterModule.forChild(notificationRoutes);

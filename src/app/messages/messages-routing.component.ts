import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  MessagesComponent
} from './messages.component';

const messagesRoutes: Routes = [{
  path: '',
  component: MessagesComponent
}, {
  path: ':id',
  component: MessagesComponent
}];



export const messagesRouting: ModuleWithProviders = RouterModule.forChild(messagesRoutes);

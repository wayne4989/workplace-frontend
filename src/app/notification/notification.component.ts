import {
  Component, AfterViewInit
} from '@angular/core';

import {
  UserModel
} from '../shared/models';
import {
  UserService
} from '../../services';
import {
  UserApiService, NotificationApiService
} from '../../services/api';

@Component({
  selector: 'notification-component',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements AfterViewInit {

  constructor (private notificationService: NotificationApiService) {
  }

  protected user = UserService.getUser();

  private updateNotificationStatusHandler = (userId, status) => {
    this.notificationService.promiseUpdateReadNotificationStatus(userId, status)
    .then((res) => {

    })
    .catch(err => {

    });
  }
  public ngAfterViewInit (): void {
    console.log('user ==> ', this.user);

    this.updateNotificationStatusHandler(this.user.id, true);
  }
}

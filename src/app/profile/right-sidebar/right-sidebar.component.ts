import {
  Component
} from '@angular/core';
import {
  UserApiService
} from '../../../services/api/user.api.service';
import {
  UserService
} from '../../../services/user.service';
import {
  UserModel,
  IResponse,
  FollowUser
} from '../../shared/models';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../services';

@Component({
  selector: 'profile-right-sidebar-component',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class ProfileRightSidebarComponent {
  constructor (private userApiService: UserApiService) {
    this.followed = this.user ? this.user.isAlreadyFollowed : false;
  }

  protected user: UserModel = UserService.getOtherUser();
  protected followed: boolean = false;
  private followUser: FollowUser = new FollowUser();

  protected onClickFollowButton (): void {
    if (this.followed) {
      return this.onUnFollowUser();
    }

    return this.onFollowUser();
  }

  private onFollowUser (): void {
    this.followUser.recipientId = this.user.id;
    this.userApiService.promisePostFollowUser(this.followUser)
    .then((response: IResponse) => {
      this.followed = true;
    })
    .catch(error => {
      console.log('follow user', error);
      this.followErrorNotification('Follow');
    });
  }

  private onUnFollowUser (): void {
    this.userApiService.promisePostUnfollowUser(this.user.id)
    .then((response: IResponse) => {
      this.followed = false;
    })
    .catch(error => {
      console.log('follow user', error);
      this.followErrorNotification('Unfollow');
    });
  }

  private followErrorNotification (action): MessageNotificationService {
    return MessageNotificationService.show({
      notification: {
        id: 'right-sidebar-follow-message',
        message: action + ' Error',
        instruction: 'Something went wrong! Please try again.'
      }
    },
    NotificationTypes.Error);
  }
}

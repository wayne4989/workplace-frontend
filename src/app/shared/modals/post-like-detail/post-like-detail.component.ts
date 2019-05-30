import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  PostModel,
  UserModel,
  IResponse
} from '../../models';
import {
  UserApiService
} from '../../../../services/api/user.api.service';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../../services';

@Component({
  selector: 'shared-post-like-detail-modal-component',
  templateUrl: './post-like-detail.component.html',
  styleUrls: ['./post-like-detail.component.scss']
})
export class SharedPostLikeDetailModalComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA) protected postLikeDetailData: any,
    private router: Router,
    private dialog: MatDialog,
    private userApiService: UserApiService
  ) {}

  protected post: PostModel = this.postLikeDetailData.post;
  protected user: UserModel = this.postLikeDetailData.user;
  protected followed: boolean = false;

  public ngOnInit (): void {}

  protected onClickUserProfile (user): Promise<boolean> {
    /** Close Modal */
    this.dialog.closeAll();

    let userId = CryptoUtilities.cipher(user.id);

    if (user.id === this.user.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }

  protected onClickFollowButton (user): void {
    this.userApiService.promisePostFollowUser(user.id)
      .then((response: IResponse) => {
        console.log('follow user', response);
        this.followed = true;
      })
      .catch(error => {
        console.log('follow user', error);
        this.followErrorNotification();
      });
  }

  private followErrorNotification (): MessageNotificationService {
    return MessageNotificationService.show({
      notification: {
        id: 'right-sidebar-follow-message',
        message: 'Follow Error',
        instruction: 'Something went wrong! Please try again.'
      }
    },
    NotificationTypes.Error);
  }
}

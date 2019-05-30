import {
  Component
} from '@angular/core';
import {
  NotificationApiService
} from '../../../../services/api';
import {
  NotificationModel
} from '../../models';
import {
  CryptoUtilities
} from '../../utilities';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'notification-list-component',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class SharedNotificationListComponent {
  constructor (
    private notificationApiService: NotificationApiService,
    private router: Router
  ) {}

  protected notifications: NotificationModel[];

  public ngOnInit (): void {
    this.notificationApiService.promiseGetAllNotifications()
      .then(response => {
          this.notifications = response;
      })
      .catch(error => {
        console.log(error);
      });
  }

  protected goToUserProfile (user): void {
    let userId = CryptoUtilities.cipher(user.id);
    this.router.navigate([`/profile/${userId}`]);
  }

  protected goToUserPostReply (post): void {
    let postId = CryptoUtilities.cipher(post.id);
    let queryParams = {
      postId: postId,
      isShowPostReply: 1
    };
    this.router.navigate([`/home`], {queryParams});
  }

  protected goToUserPostLike (post): void {
    let postId = CryptoUtilities.cipher(post.id);
    let queryParams = {
      postId: postId,
      isShowPostReply: 0
    };
    this.router.navigate([`/home`], {queryParams});
  }

  protected goToUserPostShare (post): void {
    let postId = CryptoUtilities.cipher(post.id);
    let queryParams = {
      postId: postId,
      isShowPostReply: 0
    };
    this.router.navigate([`/home`], {queryParams});
  }

  protected goToCommunityQuestionFollow (post): void {
    let postId = CryptoUtilities.cipher(post.id);
    let courseId = CryptoUtilities.cipher(post.courseId);
    let queryParams = {
      postId: postId,
      courseId: courseId
    };
    this.router.navigate([`/community/student-community/landing`], {queryParams});
  }

  protected goToCommunityQuestionAnswer (post): void {
    let encryptedItemPostId = CryptoUtilities.cipher(post.id);
    let encryptedItemCourseId = CryptoUtilities.cipher(post.courseId);
    this.router.navigate([`/community/student-community/${encryptedItemCourseId}/${encryptedItemPostId}`]);
  }
}

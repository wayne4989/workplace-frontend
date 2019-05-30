import {
  Component,
  OnInit,
  Inject,
  Output
} from '@angular/core';
import {
  DOCUMENT
} from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material';
import {
  PostModel,
  CampusPostModel,
  SharePostModel,
  IResponse
} from '../../models';
import {
  PostApiService
} from '../../../../services/api';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../../services';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'shared-share-post-modal-component',
  templateUrl: './share-post.modal.component.html',
  styleUrls: ['./share-post.modal.component.scss']
})
export class SharedSharePostModalComponent implements OnInit {
  constructor (
    @Inject (MAT_DIALOG_DATA) private post: PostModel|CampusPostModel,
    @Inject(DOCUMENT) private document: Document,
    private postApiService: PostApiService,
    private dialog: MatDialog,
  ) {
    this.document.body.classList.add('mat-dialog-is-open');
    this.sharedPostDetail = this.post.postShare ? this.post.postShare : this.post;
  }

  protected share: SharePostModel = new SharePostModel();
  protected isCurrentlySharing = false;
  protected fullPostIsShown: boolean = false;
  protected sharedPostDetail: any = [];

  public ngOnInit (): void {}

  protected sharePost (): void  {
    this.isCurrentlySharing = true;

    MessageNotificationService.show({
      notification: {
        id: 'share-post-please-wait',
        message: 'Sharing post',
        instruction: 'Please wait...'
      }
    },
    NotificationTypes.Info);

    this.postApiService.promiseSharePost(this.sharedPostDetail.id, this.share)
      .then((sharePost: PostModel|CampusPostModel) => {
        this.isCurrentlySharing = false;
        sharePost.postShare = this.sharedPostDetail;

        let sharePostModalComponent = this.dialog.getDialogById('SharePostModalComponent');
        sharePostModalComponent.close(sharePost);

        MessageNotificationService.show({
          notification: {
            id: 'share-post-success',
            message: 'Your post has beed shared.',
            instruction: ''
          }
        },
        NotificationTypes.Success);
      })
      .catch(error => {
        if (error.status === 400) {
          MessageNotificationService.show({
            notification: {
              id: 'share-post-error',
              message: 'Unable to Share Post.',
              reason: 'Share details should be filled in.',
              instruction: 'Please say something about this post.'
            }
          },
          NotificationTypes.Error);
        }

        this.isCurrentlySharing = false;
      });
  }

  protected getPollExpiryDuration (createdDate, duration): any {
    let date = new Date(createdDate);
    let expiryDate = date.setDate(date.getDate() + duration);
    let dateNow: any = new Date();

    let seconds = Math.floor((expiryDate - (dateNow)) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    // hours = hours-(days*24);
    minutes = minutes - (days * 24 * 60) - ((hours - (days * 24)) * 60);
    // seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

    let hoursLeft = null;
    let minutesLeft = null;

    if (hours !== 0) {
      if (hours > 1) {
        hoursLeft = hours + ' hours and ';
      } else if (hours === 1) {
        hoursLeft = hours + ' hour and ';
      }
    }

    if (minutes !== 0) {
      if (minutes > 1) {
        minutesLeft = minutes + ' minutes left ';
      } else if (hours === 1) {
        minutesLeft = minutes + ' minute left ';
      }
    }

    return hoursLeft + minutesLeft;
  }

  protected getPollVoteCount (pollOptions): number {
    let total = 0;
    for ( let i = 0; i < pollOptions.length; i++ ) {
      total += pollOptions[i].count;
    }

    return total;
  }

  protected getPollPercentage (option, pollOptions): string {
    let totalVotes = this.getPollVoteCount(pollOptions);
    let percentage = option.count === 0 ? 0 : (option.count / totalVotes) * 100;
    let percent = percentage.toFixed(1);

    return percent;
  }

  protected trimStory (message, maxCharacters): string {
    let trimmedString = message.substr(0, maxCharacters);
    return trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + '...';
  }
}

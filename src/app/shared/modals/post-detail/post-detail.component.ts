import {
  Component,
  OnInit,
  Inject,
  Input
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  PostModel,
  UserModel
} from '../../models';
import {
  PostApiService
} from '../../../../services/api';

@Component({
  selector: 'shared-post-detail-modal-component',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class SharedPostDetailModalComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA) protected postDetailData: any,
    private router: Router,
    private dialog: MatDialog,
    private postApiService: PostApiService
  ) {}

  protected post: PostModel = this.postDetailData.post;
  protected user: UserModel = this.postDetailData.user;
  protected route: {name: string, campusId?: number, campusFreshersFeedId?: number} = this.postDetailData.route;

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

  protected getPollExpiryDuration (createdDate, duration): any {
    let date = new Date(createdDate);
    let expiryDate = date.setDate(date.getDate() + duration);
    let dateNow: any = new Date();

    let seconds = Math.floor((expiryDate - (dateNow)) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    minutes = minutes - (days * 24 * 60) - ((hours - (days * 24)) * 60);

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

    let separator = (hoursLeft && minutesLeft ? 'and ' : '');

    return (hoursLeft ? hoursLeft : '') + separator + (minutesLeft ? minutesLeft : 'left');
  }

  protected getPollVoteCount (pollOptions): number {
    let total = 0;
    for ( let i = 0; i < pollOptions.length; i++ ) {
      total += pollOptions[i].count;
    }

    return total;
  }

  protected onPollVote (pollIndex, option, pollOptions): void {
    this.postApiService.promiseVotePoll(option.id).then(response => {
      console.log('response', response);
      // this.postSavedSubcribers();
      pollOptions[pollIndex].count += 1;
      this.getPollVoteCount(pollOptions);
      this.getPollPercentage(option, pollOptions);
    }, error => {
      console.log('error', error);
    });
  }

  protected getPollPercentage (option, pollOptions): string {
    // assign a default value for count if there is non
    // meaning this object comes upon clicking add post
    if (!option.count) { option.count = 0; }
    let totalVotes = this.getPollVoteCount(pollOptions);
    let percentage = option.count === 0 ? 0 : (option.count / totalVotes) * 100;
    let percent = percentage.toFixed(1);

    return percent;
  }
}

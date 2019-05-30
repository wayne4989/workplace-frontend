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
  CommunityPostModel,
  UserModel
} from '../../models';

@Component({
  selector: 'shared-community-post-reply.component',
  templateUrl: './community-post-reply.component.html',
  styleUrls: ['./community-post-reply.component.scss']
})
export class SharedCommunityPostReplyComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA) protected communityPostReply: any,
    private router: Router,
    private dialog: MatDialog
  ) {}
  protected communityPost: CommunityPostModel = this.communityPostReply.communityPost;
  protected reply: any = this.communityPostReply.reply;
  protected user: UserModel = this.communityPostReply.user;
  protected courseId: string = this.communityPostReply.courseId;
  protected questionId: string = this.communityPostReply.questionId;
  protected route: {name: string, campusId?: number, campusFreshersFeedId?: number} = this.communityPostReply.route;

  public ngOnInit (): void {
  }

  protected onClickUserProfile (user): Promise<boolean> {
    /** Close Modal */
    this.dialog.closeAll();

    let userId = CryptoUtilities.cipher(user.id);

    if (user.id === this.user.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }
}

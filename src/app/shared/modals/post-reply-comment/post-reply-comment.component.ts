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
  UserModel
} from '../../models';
import {
  UserService
} from '../../../../services';

@Component({
  selector: 'shared-post-reply-comment-model-component',
  templateUrl: './post-reply-comment.component.html',
  styleUrls: ['./post-reply-comment.component.scss']
})
export class SharedPostReplyCommentModalComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA) protected postReplyComment: any,
    private router: Router,
    private dialog: MatDialog
  ) {}
  protected post: any = this.postReplyComment.post;
  protected reply: any = this.postReplyComment.reply;
  protected user: UserModel = UserService.getUser();
  protected route: {name: string, campusId?: number, campusFreshersFeedId?: number} = this.postReplyComment.route;

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

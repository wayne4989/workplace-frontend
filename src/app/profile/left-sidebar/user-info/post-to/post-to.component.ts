import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  PostApiService
} from '../../../../../services/api';
import {
  PostModel,
  IResponse
} from '../../../../shared/models';

@Component({
  selector: 'profile-left-sidebar-user-info-nessage-component',
  templateUrl: './post-to.component.html',
  styleUrls: ['./post-to.component.scss']
})
export class ProfileLeftSidebarUserInfoPostToDiaglogComponent implements OnInit {
  constructor (
    private dialog: MatDialog,
    private postApiService: PostApiService,
    @Inject(MAT_DIALOG_DATA) protected user
  ) { }

  private post: PostModel = new PostModel();

  public ngOnInit (): void {}

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSendMessage (postMessage: HTMLTextAreaElement): void {
    this.post.assimilate({
      message: postMessage.value,
      postTo: this.user.id
    });
    this.postApiService.promisePostTo(this.post)
      .then(() => {})
      .catch(() => {});
  }
}

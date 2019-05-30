import {
  Component,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material';
import {
  CommunityApiService,
} from '../../../../services/api';
import {
  ReportPostModel,
  PostModel,
  IResponse
} from '../../models';
@Component({
  selector: 'report-post-community-modal',
  templateUrl: 'report.post.community.modal.component.html'
})
export class ReportPostCommunityModalComponent {
  constructor (
    @Inject (MAT_DIALOG_DATA)
    private post: PostModel,
    private communityApiService: CommunityApiService,
    private dialog: MatDialog
  ) {}
  protected isDisabled = true;
  protected isVisible = true;
  private report = new ReportPostModel();

  protected selectReason (reason): void {
    this.isDisabled = false;

    if (reason === 'not-interested') {
      this.report.reason = 'I am not interested in this Post';
      this.isVisible = true;
      this.isDisabled = false;
    } else if (reason === 'harmful') {
      this.report.reason = 'This Post is abusive and harmful';
      this.isVisible = true;
      this.isDisabled = false;
    } else if (reason === 'spam') {
      this.report.reason = 'This Post is posting Spam';
      this.isVisible = true;
      this.isDisabled = false;
    } else if (reason === 'others') {
      this.report.reason = '';
      this.isVisible = false;
      this.isDisabled = true;
    }
  }

  protected submitReport (): void {
    this.isDisabled = true;
    this.communityApiService.promiseReportPost(this.post.id, this.report)
      .then((response: IResponse) => {
        let sharedReportPostModalComponent = this.dialog.getDialogById('SharedReportPostCommunityModalComponent');
        sharedReportPostModalComponent.close();
        this.report.init();
      });
  }

  protected reportCustomReason (event): void {
    this.isDisabled = false;
  }
}

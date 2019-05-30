import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  ReportPostCommunityModalComponent,
  SharedConfirmModalComponent
} from '../../modals';
import {
  PostModel, UserModel
} from '../../models';

@Component({
  selector: 'report-post-community-component',
  templateUrl: './report.post.community.component.html',
  styleUrls: ['./report.post.community.component.scss']
})
export class SharedReportPostCommunityComponent {
  constructor (
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}
  @Output() protected onDeletePost = new EventEmitter();
  @Input() protected post: PostModel;
  @Input() protected user: UserModel;

  protected openReportModal (): void {
    this.dialog.open(ReportPostCommunityModalComponent, {
      data: this.post,
      id: 'SharedReportPostCommunityModalComponent'
    });
  }

  protected onOpenConfirmModal (): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'report-post-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.id = 'SharedConfirmModalComponent';
    dialogConfig.data = {
     description : 'Do you want to proceed?'
    };
    this.dialog.open(SharedConfirmModalComponent, dialogConfig)
    .beforeClose()
    .subscribe(response => {
      if (response) {
        this.onDeletePost.emit(this.post.id);
      }
    });
  }
}

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
  ReportPostModalComponent,
  SharedConfirmModalComponent
} from '../../modals';
import {
  PostReplyModel,
  UserModel
} from '../../models';
import {
  UserService
} from '../../../../services';

@Component({
  selector: 'report-post-reply-component',
  templateUrl: './report.post-reply.component.html',
  styleUrls: ['./report-post-reply.component.scss']
})
export class SharedReportPostReplyComponent {
  constructor (
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}
  @Output() protected onDeletePostReply = new EventEmitter();
  @Input() protected reply: PostReplyModel;
  private user: UserModel = UserService.getUser();
  protected openReportModal (): void {
    this.dialog.open(ReportPostModalComponent, {
      data: this.reply,
      id: 'SharedReportPostModalComponent'
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
        this.onDeletePostReply.emit(this.reply['id']);
      }
    });
  }
}

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
  PostModel, UserModel
} from '../../models';
import {UserService} from '../../../../services';

@Component({
  selector: 'report-post-component',
  templateUrl: './report.post.component.html',
  styleUrls: ['./report.post.component.scss']
})
export class SharedReportPostComponent {
  constructor (
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}
  @Output() protected onDeletePost = new EventEmitter();
  @Input() protected post: PostModel;
  private user: UserModel = UserService.getUser();
  protected openReportModal (): void {
    this.dialog.open(ReportPostModalComponent, {
      data: this.post,
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
        this.onDeletePost.emit(this.post.id);
      }
    });
  }
}

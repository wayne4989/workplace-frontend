import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material';
import {
  PostModel
} from '../../models';

@Component({
  selector: 'shared-confirm-modal-component',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class SharedConfirmModalComponent {
  constructor (
    @Inject(MAT_DIALOG_DATA) protected confirmActionData: any,
    private dialog: MatDialog,
  ) { }

  protected isOk (): void {
    let shareConfirmModalComponent = this.dialog.getDialogById('SharedConfirmModalComponent');
    shareConfirmModalComponent.close(true);
  }
}

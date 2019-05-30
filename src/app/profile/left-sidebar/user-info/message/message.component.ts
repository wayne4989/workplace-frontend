import {
  Component
} from '@angular/core';
import {
  MatDialog,
} from '@angular/material';

@Component({
  selector: 'profile-left-sidebar-user-info-nessage-component',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class ProfileLeftSidebarUserInfoMessageDiaglogComponent {
  constructor (private dialog: MatDialog) {}

  protected onCancel (): void {
    this.dialog.closeAll();
  }
}

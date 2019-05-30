import {
  Component,
  Input
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  UserModel
} from '../../../shared/models';
import {
  UserApiService
} from '../../../../services/api';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  ProfileLeftSidebarUserInfoMessageDiaglogComponent
} from './message/message.component';
import {
  ProfileLeftSidebarUserInfoPostToDiaglogComponent
} from './post-to/post-to.component';
import {
  ProfileLeftSidebarUserInfoAboutMeDialogComponent
} from './modal/about-me-modal.component';
import {
  SharedImagePreviewComponent
} from '../../../shared/modals/image-preview/image-preview.component';
import {UserService} from '../../../../services';

@Component({
  selector: 'profile-left-sidebar-user-info-component',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class ProfileLeftSidebarUserInfoComponent {
  constructor (
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private overlay: Overlay,
    private router: Router
  ) {}

  @Input() protected user: UserModel;
  @Input() protected isUserProfile;
  private currentUser: UserModel = UserService.getUser();
  public ngOnInit (): void {}

  protected onOpenMessageDiaglogComponent (): void {
    // this.dialog.open(ProfileLeftSidebarUserInfoMessageDiaglogComponent);
    let parentId = CryptoUtilities.cipher(this.currentUser.id);
    let userId = CryptoUtilities.cipher(this.user.id);
    let queryParams = {
      isDirectMessage: true,
      pid: parentId,
      id: userId
    };

    this.router.navigate([`/messages`], {queryParams});
  }

  protected onOpenPostToDiaglogComponent (): void {
    this.dialog.open(ProfileLeftSidebarUserInfoPostToDiaglogComponent, {
      data: this.user
    });
  }

  protected onOpenAboutMeDialog (): void {
    this.dialog.open(ProfileLeftSidebarUserInfoAboutMeDialogComponent, {
      id: 'ProfileLeftSidebarUserInfoAboutMeDialogComponent',
      data: this.user.aboutMe
    })
    .afterClosed()
    .subscribe(aboutMe => {
      if (!aboutMe) { return; }
      this.user.aboutMe = aboutMe;
    });
  }

  protected onOpenShowImageDialogComponent (user): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      image: user.socialImage
        ? (user.profilePicture === 'avatar' ? user.socialImage : user.profilePicture)
        : user.profilePicture,
      source: 'profile-picture'
    };
    this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }
}

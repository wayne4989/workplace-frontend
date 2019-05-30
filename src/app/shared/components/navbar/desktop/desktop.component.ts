import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserModel
} from '../../../models';
import {
  TokenStore,
  UserService
} from '../../../../../services';
import {
  MatDialogConfig,
  MatDialog
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  SharedCreateMessageComponent
} from '../../../modals';
import {
  MessagesApiService,
  NotificationApiService
} from '../../../../../services/api';

@Component({
  selector: 'navbar-desktop-component',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class NavbarDesktopComponent {
  constructor (
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay,
    private messagesApiService: MessagesApiService,
    private notificationApiService: NotificationApiService,
  ) {}

  protected user: UserModel = UserService.getUser();
  protected keyword: string = null;
  protected unReadMessageCount: number = 0;
  protected unReadNotificationCount: number = 0;

  protected onSignOut (): void {
    TokenStore.expungeData();
    window.location.reload();
  }

  public  ngAfterViewInit (): void {
    this.messagesApiService.promiseGetUnReadMessageCount()
      .then(response => {
        if (response && response['data']) {
          this.unReadMessageCount = response['data'];
        }
      }).catch(error => {
      console.log(error);
    });

    this.notificationApiService.promiseGetUnReadNotificationCount()
      .then(response => {
        if (response && response['data']) {
          this.unReadNotificationCount = response['data'];
        }
      }).catch(error => {
      console.log(error);
    });
  }

  protected onNewMessageClick (): void {
    // let queryParams = {
    //   newMsg: true
    // }

    // this.router.navigate([`/messages`], {queryParams});
    /* Added MatDialogConfig for adding a custom setting for this modal */
    let dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'share-post-modal';
    dialogConfig.disableClose = true;
    // dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = 'this.post';
    dialogConfig.id = 'SharePostModalComponent';
    this.dialog.open(SharedCreateMessageComponent, dialogConfig);
      // .afterClosed()
      // .subscribe((post: PostModel|CampusPostModel) => {
      //   if (post) {
      //     PostEmitter.postShare().emit(post);
      //   }
      // }, error => {
      //   console.log(error);
      // });
  }
}

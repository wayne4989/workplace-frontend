import {
  Component
} from '@angular/core';
import {
  MatDialogConfig,
  MatDialog
} from '@angular/material';
import {
  SharedCreateMessageComponent
} from '../../../shared/modals';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'messages-left-sidebar-component',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})

export class MessagesLeftSideBarComponent {
  constructor (
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  protected conversations: any = [];
  private routeSubscriber: any;
  private isDirectMessage: boolean = false;
  private timer: any = null;
  public ngOnInit (): void {
    this.routeSubscriber = this.route
      .queryParams
      .subscribe(params => {
        if (params.isDirectMessage && params.id) {
         this.isDirectMessage = params.isDirectMessage;
        }
      });
  }

  public ngAfterViewInit (): void {
    if (this.isDirectMessage) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.onNewMessageClick();
      }, 500);
    }
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

  public ngOnDestroy (): void {
    this.routeSubscriber.unsubscribe();
  }

}

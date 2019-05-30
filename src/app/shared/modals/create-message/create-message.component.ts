import {
  Component,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  PostEmitter
} from '../../emitter';
import {
  UserModel,
  IResponse,
  MessageModel
} from '../../models';
import {
  UserApiService,
  MessagesApiService
} from '../../../../services/api';
import {
  UserService
} from '../../../../services';

@Component({
  selector: 'shared-create-message-component',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class SharedCreateMessageComponent {
  constructor (
    @Inject(MAT_DIALOG_DATA) public imageAttachments: any,
    private dialog: MatDialog,
    private userApiService: UserApiService,
    private messagesApiService: MessagesApiService
  ) {}

  protected searchResults: any = [];
  protected message: MessageModel = new MessageModel();
  private user: UserModel = UserService.getUser();
  protected keyword: string = '';
  protected selectedRecipient: UserModel;
  private timer: any = null;
  private otherUser: UserModel = UserService.getOtherUser();
  // api/v1/user/search/via-tag?keyword=
  public ngAfterViewInit (): void {
    this.message.fromId = this.user.id;
    if (this.otherUser) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.selectedRecipient = this.otherUser;
        this.message.toId = this.otherUser.id;
      }, 500);
    }
  }

  protected onChangeSearch (): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.userApiService.promiseGetSearchViaTag(this.keyword)
      .then(response => {
        console.log('via tag', response);
        this.searchResults = response;
      })
      .catch(error => {
        console.log('via-tag error', error);
      });
    }, 500);
  }

  protected onCloseModal (): void {
    this.dialog.closeAll();
  }

  protected onResultSelected (user): void {
    this.selectedRecipient = user;
    this.message.toId = user.id;
    this.searchResults = [];
    this.keyword = '';
  }

  protected doSendMessage (): void {
    this.messagesApiService.promiseCreateMessage(this.message)
      .then(response => {
        console.log(response);
        this.message.detail = null;
        this.onCloseModal();
      })
      .catch(error => {
        console.log(error);
      });
  }

}

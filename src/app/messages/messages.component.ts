import {
  Component
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  MessageModel
} from '../shared/models';
import {
  UserService
} from '../../services';
import {
  MessagesApiService
} from '../../services/api';
import {
  CryptoUtilities
} from '../shared/utilities';

@Component({
  selector: 'messages-component',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent {
  constructor (
    private messagesApiService: MessagesApiService,
    private route: ActivatedRoute
  ) {}

  private routeSubscriber: any;
  protected user = UserService.getUser();
  protected message: MessageModel = new MessageModel();
  protected conversation: Array<MessageModel>;

  public ngOnInit (): void {
    this.routeSubscriber = this.route
      .queryParams
      .subscribe(params => {
        if (params.pid) {
          this.message.parentId = params.pid && parseFloat(CryptoUtilities.decipher(params.pid));
          this.getConversation();
        }
      });
  }

  private getConversation (): void {
    this.messagesApiService.promiseGetMessageListByParentId(this.message.parentId)
      .then(response => {
        // console.log('conversations', response);
        if (response) {
          this.conversation = response.reverse();
          this.message.fromId = this.user.id;
          if (this.conversation && this.conversation[0] && this.conversation[0].toId) {
            this.message.toId = this.conversation[0].toId;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  protected doSendMessage (): void {
    this.messagesApiService.promiseCreateMessage(this.message)
      .then(response => {
        this.message.detail = null;
        this.getConversation();
      })
      .catch(error => {
        console.log(error);
      });
  }

  public ngOnDestroy (): void {
    this.routeSubscriber.unsubscribe();
  }
}

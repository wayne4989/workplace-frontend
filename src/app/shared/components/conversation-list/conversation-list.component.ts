import {
  Component,
  Input
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  CryptoUtilities
} from '../../utilities';
import {
  MessageModel,
  UserModel
} from '../../models';
import {
  MessagesApiService
} from '../../../../services/api';

@Component({
  selector: 'shared-conversation-list-component',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class SharedConverstionListComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private messagesApiService: MessagesApiService
  ) {}

  @Input() protected conversations: Array<MessageModel> = [];

  protected message: MessageModel;
  protected user: UserModel;
  protected activeConversationId: number = null;

  public ngOnInit (): void {
    this.messagesApiService.promiseGetMessageList()
    .then(response => {
      console.log('RESPONSE', response);
      this.conversations = response;
    })
    .catch(error => {
      console.log(error);
    });
  }

  protected onUserClick (conversation): void {
    let userId = CryptoUtilities.cipher(conversation.to);
    let parentId = CryptoUtilities.cipher(conversation.id);
    let queryParams = {
      id: userId,
      pid: parentId
    };

    this.activeConversationId = conversation.toId;

    this.router.navigate([`/messages`], {queryParams});
  }
}

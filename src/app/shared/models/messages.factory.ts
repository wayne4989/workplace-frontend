import {
  MessageModel
} from './messages';
import * as moment from 'moment';

export class MessagesFactory {
  public static create (data: any): MessageModel {
    return <MessageModel> (new MessageModel ())
      .assimilate(data)
      .injectRelatedData(MessagesFactory.buildPostPollOptions);
  }

  public static createMany (data: Array<MessageModel>): Array<MessageModel> {
    return data.map(
      instanceData => MessagesFactory.create(instanceData),
    );
  }

  public static createManyMessage (data: Array<MessageModel>): Array<MessageModel> {
    return data.map(
      instanceData => MessagesFactory.create(instanceData),
    );
  }

  public static buildPostPollOptions (messageModel: MessageModel): MessageModel {
    if (messageModel.updatedAt) {
      let durationDisplay: string = moment(messageModel.updatedAt).startOf('hour').fromNow();

      messageModel['fromNow'] = `${durationDisplay}`;
    }

    return messageModel;
  }
}

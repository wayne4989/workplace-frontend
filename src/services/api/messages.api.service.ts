import {
  Injectable
} from '@angular/core';
import {
  HttpParams
} from '@angular/common/http';
import {
  ApiService
} from '../api.service';
import {
  MessageModel,
  IResponse
} from '../../app/shared/models';
import {
  MessagesFactory
} from '../../app/shared/models/factory';

@Injectable()
export class MessagesApiService extends ApiService {
  public options = {};
  public baseURI = 'message';
  public baseURIPlural = 'message';

  public promiseGetMessageList (limit: number = 10, offset: number = 0): Promise<MessageModel[]> {
    let params = new HttpParams()
    .set('limit', limit.toString())
    .set('offset', offset.toString());

    this.options = {
      params: params
    };

    return this.promiseGetAllResponseData('list')
      .then((response: IResponse) => {
        return MessagesFactory.createMany(response.data.rows);
      });
  }

  public promiseGetMessageListByParentId (parentId: number, limit: number = 10, offset: number = 0): Promise<MessageModel[]> {
    let params = new HttpParams()
    .set('limit', limit.toString())
    .set('offset', offset.toString());

    this.options = {
      params: params
    };

    return this.promiseGetAllResponseData(`list/${parentId}`)
      .then((response: IResponse) => {
        return MessagesFactory.createMany(response.data);
      });
  }

  public promiseCreateMessage (message: MessageModel): Promise<MessageModel> {
    return this.promisePostModelData('', message)
      .then((response: IResponse) => {
        return MessagesFactory.create(response);
      });
  }

  public promiseGetUnReadMessageCount (): Promise<MessageModel> {
    return this.promiseGetResponseData('count')
      .then((response: IResponse) => {
        return MessagesFactory.create(response);
      });
  }
}

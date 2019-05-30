import {
  Injectable
} from '@angular/core';
import {
  ApiService
} from '../api.service';
import {
  NotificationModel,
  IResponse, MessageModel
} from '../../app/shared/models';
import {
  MessagesFactory,
  NotificationFactory
} from '../../app/shared/models/factory';

@Injectable()
export class NotificationApiService extends ApiService {
  public options = {};
  public baseURI = 'notification';
  public baseURIPlural = 'notifications';

  public promiseGetAllNotifications (): Promise<NotificationModel[]> {
    return this.promiseGetResponseData('list')
      .then((response: IResponse) => {
        return NotificationFactory.createMany(response.data.rows);
      });
  }

  public promiseGetUnReadNotificationCount (): Promise<any> {
    return this.promiseGetResponseData('count')
      .then((response: IResponse) => {
        return response;
      });
  }

  public promiseUpdateReadNotificationStatus (subjectId: number, status: boolean): Promise<any> {
  const notification = new NotificationModel();
  notification.isRead = status;
    return this.promisePutModelData('update/' + subjectId, notification)
      .then((response: IResponse) => {
        return response;
      });
  }
}

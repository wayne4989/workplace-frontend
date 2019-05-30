import {
  NotificationModel
} from './notification';

export class NotificationFactory {
  public static create (data: any): NotificationModel {
    return <NotificationModel> (new NotificationModel ())
      .assimilate(data);
  }

  public static createMany (data: Array<NotificationModel>): Array<NotificationModel> {
    return data.map(
      instanceData => NotificationFactory.create(instanceData),
    );
  }
}

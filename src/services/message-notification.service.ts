import {Injectable} from '@angular/core';
import {Logger} from '../app/shared/classes/logger';
import {Subject} from 'rxjs/Subject';

export enum NotificationTypes {
  Success,
  Info,
  Warning,
  Error,
  AccessError,
}

export class Notifications {
  [id: string]: Notification
}

export interface INotificationMessageData {
  id: string;
  message: string;
  reason?: string;
  instruction: string;
}

export interface INotificationMessageSet {
  id?: string;
  notification: INotificationMessageData;
}

export class MessageNotificationService {
  constructor () {}

  public static notifications: Notifications = {};
  public static onShow: Subject<any> = new Subject();

  public static show (
    messageSet: INotificationMessageSet,
    type = NotificationTypes.Info,
    timeout?: any,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      timeout = !isNaN(timeout) ? timeout : 3000;
      timeout += Object.keys(MessageNotificationService.notifications).length * 1000;
      let messageData = messageSet.notification;

      let notification = new Notification(
        messageData,
        type,
        timeout);


      MessageNotificationService.addNotification(notification);
      let onNotificationChange: Subject<any> = new Subject();
      resolve(onNotificationChange);

      if (notification.hasTimeout()) {
        setTimeout(
          () => {
            onNotificationChange.next(true);
            onNotificationChange.complete();
            MessageNotificationService.deleteNotification(notification);
          },
          timeout);
      }
    });
  }

  private static addNotification (notification: Notification): void {
    // remove it if it exists already
    MessageNotificationService.deleteNotification(notification);
    MessageNotificationService.notifications[notification.id] = notification;

    MessageNotificationService.onShow.next(MessageNotificationService);
  }

  private static deleteNotification (notification: Notification): void {
    if (MessageNotificationService.notifications.hasOwnProperty(notification.id)) {
      delete MessageNotificationService.notifications[notification.id];

      MessageNotificationService.onShow.next(MessageNotificationService);
    }
  }
}

class Notification {
  constructor (
    messageData: INotificationMessageData,
    type: NotificationTypes,
    timeout: number,
  ) {
    let min = 0, max = 1000;

    Logger.debug('Notification shown: ', NotificationTypes[type], messageData, new Error());

    this.instanceId = (new Date()).getUTCMilliseconds() + Math.floor(Math.random() * (max - min)) + min;
    this.id = messageData.id;
    this.instructions = messageData.instruction;
    this.reason = messageData.reason;
    this.type = type;
    this.text = messageData.message;
    this.timeout = timeout;
  }

  private type: NotificationTypes;
  private text: string;
  private instructions: string;
  private reason: string;
  private instanceId = 0;
  private timeout = 0;
  public id: string;

  public isSuccess (): boolean {
    return this.type === NotificationTypes.Success;
  }

  public isInfo (): boolean {
    return this.type === NotificationTypes.Info;
  }

  public isWarning (): boolean {
    return this.type === NotificationTypes.Warning;
  }

  public isError (): boolean {
    return this.type === NotificationTypes.Error;
  }

  public isDenied (): boolean {
    return this.type === NotificationTypes.AccessError;
  }

  public hasTimeout (): boolean {
    return this.timeout > 0;
  }
}

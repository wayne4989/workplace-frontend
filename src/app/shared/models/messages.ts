import {
  Model
} from './model';

export class MessageModel extends Model {
  public id?: number;
  public createdAt?: string;
  public detail?: string;
  public from?: UserInfoModel;
  public fromId?: number;
  public fromNow?: string;
  public isRead?: number;
  public parentId?: number;
  public title?: string;
  public to?: UserInfoModel;
  public toId?: number;
  public updatedAt?: string;
  public rows?: Array<any>;

  public init (): void {}
}

class UserInfoModel {
  public name?: string;
  public id?: number;
  public firstName?: string;
  public lastName?: string;
  public profilePicture?: string;
  public socialImage?: string;
}

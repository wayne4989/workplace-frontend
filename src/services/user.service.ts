import {
  UserModel
} from '../app/shared/models';

export class UserService {
  private static user: UserModel;
  private static otherUser: UserModel;

  public static setUser (user: UserModel): void {
    UserService.user = user;
  }

  public static getUser (): UserModel {
    return UserService.user;
  }

  public static setOtherUser (user: UserModel): void {
    UserService.otherUser = user;
  }

  public static getOtherUser (): UserModel {
    return UserService.otherUser;
  }
}

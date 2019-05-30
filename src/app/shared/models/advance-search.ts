import {
  Model
} from './model';

export class AdvanceSearchModel extends Model {
  public message: string;
  public title: string;
  public userId: number;
  public sharePostId: number;
  public postCategoryId: number;

  public init (): void {}
}

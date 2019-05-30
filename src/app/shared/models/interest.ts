import {
  Model
} from './model';

export class SubInterestModel extends Model {
  public id?: number;
  public interestCategoryId?: number;
  public name: string;

  public init (): void {}
}

export class InterestCategoryModel extends Model {
  public id?: number;
  public cloudinaryPublicId?: string;
  public name: string;

  public init (): void {}
}

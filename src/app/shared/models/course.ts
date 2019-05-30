import {
  Model
} from './model';

export class CourseModel extends Model {
  public cloudinaryPublicId: string;
  public code: string;
  public description: string;
  public name: string;
  public id?: number;

  public init (): void {}
}

import {
  CourseModel
} from './course';

export class CourseFactory {
  public static create (data: any): CourseModel {
    return <CourseModel> (new CourseModel ())
      .assimilate(data);
  }

  public static createMany (data: Array<CourseModel>): Array<CourseModel> {
    return data.map(
      instanceData => CourseFactory.create(instanceData),
    );
  }
}

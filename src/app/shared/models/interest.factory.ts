import {
  SubInterestModel,
  InterestCategoryModel
} from './interest';

export class InterestFactory {
  public static createSubInterest (data: any): SubInterestModel {
    return <SubInterestModel> (new SubInterestModel ())
      .assimilate(data);
  }

  public static createManySubInterest (data: SubInterestModel[]): SubInterestModel[] {
    return data.map(
      instanceData => InterestFactory.createSubInterest(instanceData),
    );
  }

  public static createCategoryInterest (data: any): InterestCategoryModel {
    return <InterestCategoryModel> (new InterestCategoryModel ())
      .assimilate(data);
  }

  public static createManyCategoryInterest (data: InterestCategoryModel[]): InterestCategoryModel[] {
    return data.map(
      instanceData => InterestFactory.createCategoryInterest(instanceData),
    );
  }
}

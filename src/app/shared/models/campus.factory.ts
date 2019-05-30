import {
  CampusModel,
  CampusPostModel,
  CampusFreshersFeedModel,
  CampusFreshersFeedPostModel,
  CampusCourseFeedPostModel,
  CampusClassPostModel,
  CampusCourseModel,
  CampusClassModel,
  CampusStudentGroupModel,
  CampusMarketplaceModel,
} from './campus';

export class CampusFactory {
  public static createCampus (data: any): CampusModel {
    return <CampusModel> (new CampusModel ())
      .assimilate(data);
  }

  public static createManyCampus (data: Array<CampusModel>): Array<CampusModel> {
    return data.map(
      instanceData => CampusFactory.createCampus(instanceData),
    );
  }

  public static createCampusPost (data: any): CampusPostModel {
    return <CampusPostModel> (new CampusPostModel ())
      .assimilate(data);
  }

  public static createManyCampusPost (data: Array<CampusPostModel>): Array<CampusPostModel> {
    return data.map(
      instanceData => CampusFactory.createCampusPost(instanceData),
    );
  }

  public static createCampusFreshersFeedPost (data: any): CampusFreshersFeedPostModel {
    return <CampusFreshersFeedPostModel> (new CampusFreshersFeedPostModel ())
      .assimilate(data);
  }

  public static createManyCampusFreshersFeedPost (data: Array<CampusFreshersFeedPostModel>): Array<CampusFreshersFeedPostModel> {
    return data.map(
      instanceData => CampusFactory.createCampusFreshersFeedPost(instanceData),
    );
  }

  public static createCampusCourseFeedPost (data: any): CampusCourseFeedPostModel {
    return <CampusCourseFeedPostModel> (new CampusCourseFeedPostModel ())
      .assimilate(data);
  }

  public static createManyCampusCourseFeedPost (data: Array<CampusCourseFeedPostModel>): Array<CampusCourseFeedPostModel> {
    return data.map(
      instanceData => CampusFactory.createCampusCourseFeedPost(instanceData),
    );
  }

  public static createCampusClassPost (data: any): CampusClassPostModel {
    return <CampusClassPostModel> (new CampusClassPostModel ())
      .assimilate(data);
  }

  public static createManyCampusClassPost (data: Array<CampusClassPostModel>): Array<CampusClassPostModel> {
    return data.map(
      instanceData => CampusFactory.createCampusClassPost(instanceData),
    );
  }

  public static createCampusFreshersFeed (data: any): CampusFreshersFeedModel {
    return <CampusFreshersFeedModel> (new CampusFreshersFeedModel ())
      .assimilate(data);
  }

  public static createManyCampusFreshersFeed (data: Array<CampusFreshersFeedModel>): Array<CampusFreshersFeedModel> {
    return data.map(
      instanceData => CampusFactory.createCampusFreshersFeed(instanceData),
    );
  }

  public static createCourse (data: any): CampusCourseModel {
    return <CampusCourseModel> (new CampusCourseModel ())
      .assimilate(data);
  }

  public static createCourseList (data: Array<CampusCourseModel>): Array<CampusCourseModel> {
    return data.map(
      instanceData => CampusFactory.createCourse(instanceData),
    );
  }

  public static createStudentGroup (data: any): CampusStudentGroupModel {
    return <CampusStudentGroupModel> (new CampusStudentGroupModel ())
      .assimilate(data);
  }

  public static createStudentGroupList (data: CampusStudentGroupModel[]): CampusStudentGroupModel[] {
    return data.map(
      instanceData => CampusFactory.createStudentGroup(instanceData),
    );
  }

  public static createMarketplace (data: any): CampusMarketplaceModel {
    return <CampusMarketplaceModel> (new CampusMarketplaceModel ())
      .assimilate(data);
  }


  public static createMarketplaceList (data: CampusMarketplaceModel[]): CampusMarketplaceModel[] {
    return data.map(
      instanceData => CampusFactory.createMarketplace(instanceData),
    );
  }

  public static createMarketplaceItem (data: any): CampusMarketplaceModel {
    return <CampusMarketplaceModel> (new CampusMarketplaceModel ())
      .assimilate(data);
  }

  public static createClass (data: any): CampusClassModel {
    return <CampusClassModel> (new CampusClassModel ())
      .assimilate(data);
  }

  public static createClassList (data: Array<CampusClassModel>): Array<CampusClassModel> {
    return data.map(
      instanceData => CampusFactory.createClass(instanceData),
    );
  }
}

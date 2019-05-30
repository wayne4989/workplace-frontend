import {
  CommunityPostModel,
  PrivateCommunityModel,
  CommunityAnswerQuestionModel
} from './community';

export class CommunityFactory {
  public static createCommunityPost (data: any): CommunityPostModel {
    return <CommunityPostModel>(new CommunityPostModel());
  }

  public static createCommunityAnswerToQuestion (data: any): CommunityAnswerQuestionModel {
    return <CommunityAnswerQuestionModel>(new CommunityAnswerQuestionModel());
  }

  public static createCommunityQuestionDetails (data: any): CommunityPostModel {
    return <CommunityPostModel>(new CommunityPostModel())
      .assimilate(data);
  }

  public static createPrivateCommunity (data: any): PrivateCommunityModel {
    return <PrivateCommunityModel>(new PrivateCommunityModel())
      .assimilate(data);
  }

  public static createFeed (data: any): CommunityPostModel {
    return <CommunityPostModel>(new CommunityPostModel())
      .assimilate(data);
  }

  public static createCommunityFeed (data: Array<CommunityPostModel>): Array<CommunityPostModel> {
    return data.map(
      instanceData => CommunityFactory.createFeed(instanceData)
    );
  }

  public static createPrivateCommunityFeed (data: any): Array<PrivateCommunityModel> {
		return data.map(
			instanceData => CommunityFactory.createFeed(instanceData)
		);
	}
}

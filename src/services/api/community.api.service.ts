import {
  Injectable
} from '@angular/core';
import {
  HttpParams
} from '@angular/common/http';
import {
  ApiService
} from '../api.service';
import {
  CommunityPostModel,
  PrivateCommunityModel,
  CommunityAnswerQuestionModel,
  IResponse, ReportPostModel
} from '../../app/shared/models';
import {
  CommunityFactory
} from '../../app/shared/models/factory';
import {Model} from '../../app/shared/models/model';
import {CommunityPostFollow} from '../../app/shared/models/community-post-follow';

@Injectable()
export class CommunityApiService extends ApiService {
  public options = {};
  public baseURI = 'post/v2/community';
  public baseURIPlural = 'post/v2/community';


  public static createPrivateCommunity (data: any): PrivateCommunityModel {
		return <PrivateCommunityModel> (new PrivateCommunityModel())
			.assimilate(data);
  }

  public static createPrivateCommunityFeed (data: any): Array<PrivateCommunityModel> {
		return data.map(
			instanceData => CommunityFactory.createFeed(instanceData)
		);
  }

	/**
	*  Get all community
	*/

  public promiseCreateStudentCommunityPosts (communityPost: CommunityPostModel): Promise<CommunityPostModel> {
    return this.promisePostModelData(`course/${communityPost.courseId}`, communityPost)
      .then((response: IResponse) => {
        return CommunityFactory.createCommunityPost(response.data);
      });
  }

  /**Get question details */
  public promiseGetQuestionDetail (courseId: Number, questionId: Number): Promise<CommunityPostModel> {
    return this.promiseGetResponseData(`course/${courseId}/${questionId}`)
      .then((response: IResponse) => {
        return CommunityFactory.createCommunityQuestionDetails(response.data);
      });
  }

  /**Answer question */
  public promiseCreateAnswerToQuestion (answer: CommunityAnswerQuestionModel): Promise<CommunityAnswerQuestionModel> {
    return this.promisePostModelData(`${answer.questionId}/reply`, answer)
      .then((response: IResponse) => {
        return CommunityFactory.createCommunityAnswerToQuestion(response.data);
      });
  }

  public promiseCreatePrivateCommunity (privateCommunity: PrivateCommunityModel): Promise<PrivateCommunityModel> {
    return this.promisePostModelData(``, privateCommunity)
      .then((response: IResponse) => {
        return CommunityFactory.createPrivateCommunity(response.data);
      });
  }

  /** Get student community posts*/
  public promiseGetAllCommunityPostsData (courseId: number): Promise<CommunityPostModel[]> {
    return this.promiseGetAllResponseData(`course/${courseId}/list`)
      .then((response: IResponse) => {
        return CommunityFactory.createCommunityFeed(response.data);
      });
  }

  /** Get student community single post*/
  public promiseGetSingleCommunityPostsData (courseId: number, postId: number): Promise<CommunityPostModel> {
    return this.promiseGetAllResponseData(`course/${courseId}/${postId}`)
      .then((response: IResponse) => {
        return CommunityFactory.createFeed(response.data);
      });
  }

  public promiseGetAllPrivateCommunityData (): Promise<PrivateCommunityModel[]> {
		return this.promiseGetResponseData(`list`)
		.then((response: IResponse) => {
			return CommunityFactory.createPrivateCommunityFeed(response.data);
		});
	}
	/** Remove community post*/
  public promiseRemoveCommunityPost (postId: number): Promise<IResponse> {
    return this.promiseRemoveData(`${postId}`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }
  /** Follow community post*/
  public promiseFollowCommunityPost (courseId: number, postId: number, record: CommunityPostFollow): Promise<IResponse> {
    return this.promisePostModelData(`${courseId}/${postId}/follow`, record)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }
  /** UnFollow community post*/
  public promiseUnFollowCommunityPost (courseId: number, postId: number): Promise<IResponse> {
    return this.promiseRemoveData(`${courseId}/${postId}/follow`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }
  /** Like community post reply */
  public promiseLikeCommunityPostReply (replyId: number): Promise<IResponse> {
    return this.promisePostModelData(`reply/${replyId}/like`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }/* Report community post*/
  public promiseReportPost (postId: number, reportPost: ReportPostModel): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/report`, reportPost)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }
  /** Remove community post reply*/
  public promiseRemoveCommunityPostReply (replyId: number): Promise<IResponse> {
    return this.promiseRemoveData(`reply/${replyId}`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }
}

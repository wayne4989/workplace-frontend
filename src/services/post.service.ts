// import {
//   Injectable
// } from '@angular/core';
// import {
//   HttpClient
// } from '@angular/common/http';
// import {
//   Observable
// } from 'rxjs/Observable';
// import {
//   Story,
//   Poll,
//   LikePost,
//   // ReplyPost,
//   RatePost,
//   // ReportPost,
//   // SharePost
// } from '../models/models';
// import {
//   ReportPost,
//   SharePost,
//   CreatePost,
//   PollModel
// } from '../app/shared/models';
// @Injectable()
// export class PostService {
//   constructor (private http: HttpClient) {}
//
//   public createPost (post: CreatePost): Observable<Object> {
//     return this.http.post('post', post);
//   }
//
//   public createstory (story: Story): Observable<Object> {
//     return this.http.post(`post/story`, story);
//   }
//
//   public createPoll (poll: PollModel): Observable<Object> {
//     return this.http.post('post/poll', poll);
//   }
//
//   public gettopstories (): Observable<Object> {
//     return this.http.get('topStories');
//   }
//
//   public getPosts (limit: number, offset: number): Observable<Object> {
//     return this.http.get(`posts?limit=${limit}&offset=${offset}`, {});
//   }
//
//   public getPost (postId: number): Observable<Object> {
//     return this.http.get(`post/${postId}`);
//   }
//
//   public sharepost (postid: number, share: SharePost): Observable<Object> {
//     return this.http.post(`post/share/${postid}`, share);
//   }
//
//   public likepost (postId: number, like: LikePost): Observable<Object> {
//     return this.http.post(`post/${postId}/like`, like);
//   }
//
//   public unlikepost (postId: number, like: LikePost): Observable<Object> {
//     return this.http.delete(`post/${postId}/like`, like);
//   }
//
//   public reportpost (postId: number, report: ReportPost): Observable<Object> {
//     return this.http.post(`post/${postId}/report`, report);
//   }
//
//   public ratepost (postId: number, rate: RatePost): Observable<Object> {
//     return this.http.post(`post/${postId}/rating`, rate);
//   }
//
//   public viewpost (postId: number): Observable<Object> {
//     return this.http.post(`post/${postId}/pageview`, {});
//   }
//
//   public getrating (postId: number): Observable<Object> {
//     return this.http.get(`post/rating/${postId}`);
//   }
//
//   public getcategoryId (categoryCode: string): Observable<Object> {
//     return this.http.get(`post/category/${categoryCode}`);
//   }
//
//   public searchpost (searchkeyword: string): Observable<Object> {
//     return this.http.get(`advance-search/post?keyword='${searchkeyword}'`);
//   }
//
//   public postTo (message: string, postTo: number): Observable<Object> {
//     const post = {message, postTo};
//     return this.http.post('post', post);
//   }
//
//   public deleteOne (postId: number): Observable<Object> {
//     return this.http.delete(`post/${postId}`);
//   }
// }

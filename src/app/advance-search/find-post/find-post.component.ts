import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  AdvanceSearchService
} from '../../../services/api';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'advance-find-post-component',
  templateUrl: './find-post.component.html',
  styleUrls: ['./find-post.component.scss']
})
export class AdvanceSearchFindPostComponent {
  constructor (
    private advanceSeachService: AdvanceSearchService,
    private route: ActivatedRoute
  ) {}

  @Output() private postSearchEvent: EventEmitter<any> = new EventEmitter<any>();
  protected keyword: string;
  private isAll: boolean;
  private routeSubscriber: any;
  protected campusName: string = '';
  private allData: Array<any> = [];

  public ngOnInit (): void {
    this.routeSubscriber = this.route
    .queryParams
    .subscribe(params => {
      this.keyword = params.k;
      this.keyword && this.onSearchPosts();
      params.a && this.onSearchAll();
    });
  }

  protected onSearchPosts (): void {
    this.advanceSeachService.promiseGetAllSearchedPosts(this.keyword)
      .then(response => {
        this.postSearchEvent.emit(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  private onSearchAll (): void {
    this.advanceSeachService.promiseGetAllSearchedPosts(this.keyword)
    .then(response => {
      this.postSearchEvent.emit(response);
      this.allData = response;
    })
    .catch(error => {
      console.log(error);
    });

    this.advanceSeachService.promiseGetAllSearchedUsers(this.keyword, this.campusName)
    .then(response => {
      console.log('all data', response.concat(this.allData));
      this.postSearchEvent.emit(response.concat(this.allData));
    })
    .catch(error => {
      console.log(error);
    });
  }

  public ngOnDestroy (): void {
    this.routeSubscriber.unsubscribe();
  }
}

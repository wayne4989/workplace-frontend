import {
  Component
} from '@angular/core';
import {
  Location
} from '@angular/common';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusCourseFeedPostModel
} from '../../../../shared/models';
import {
  CampusApiService
} from '../../../../../services/api/campus.api.service';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-course-feed-main-component',
  templateUrl: './course-feed-main.component.html',
  styleUrls: ['./course-feed-main.component.scss']
})
export class CampusCourseFeedMainComponent {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService,
    private location: Location
  ) {}

  protected campusId: number;
  protected campusCourseFeedId: number;
  protected campusCourseFeed: CampusCourseFeedPostModel[] = [];

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
    });

    this.route.params.subscribe((params: Params) => {
      this.campusCourseFeedId = params.id;
    });
  }

  public ngAfterViewInit (): void {
    this.getCampusCourseFeedPosts();
  }

  private getCampusCourseFeedPosts (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    let campusCourseFeedId = parseInt(CryptoUtilities.decipher(this.campusCourseFeedId), 10);
    this.campusApiService.promiseGetAllCoursePost(campusId, campusCourseFeedId)
      .then((campusCourseFeed: CampusCourseFeedPostModel[]) => {
        this.campusCourseFeed = campusCourseFeed;
      })
      .catch((error) => {});
  }

  protected onClickGoBackToCoureseList (): void {
    // window.history.back();
    this.location.back();
  }
}

import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusFreshersFeedPostModel
} from '../../../../shared/models';
import {
  CampusApiService
} from '../../../../../services/api/campus.api.service';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-freshers-feed-main-component',
  templateUrl: './freshers-feed-main.component.html',
  styleUrls: ['./freshers-feed-main.component.scss']
})
export class CampusFreshersFeedMainComponent {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected campusId: number;
  protected campusFreshersFeedId: number;
  protected campusFreshersFeed: Array<CampusFreshersFeedPostModel> = [];
  protected contentTypeOnMobile: string = 'timeline';

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
    });

    this.route.params.subscribe((params: Params) => {
      this.campusFreshersFeedId = params.id;
    });
  }

  public ngAfterViewInit (): void {
    this.getCampusFresheresFeedPosts();
  }

  private getCampusFresheresFeedPosts (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    let campusFreshersFeedId = parseInt(CryptoUtilities.decipher(this.campusFreshersFeedId), 10);
    this.campusApiService.promiseGetAllFreshersFeedPost(campusId, campusFreshersFeedId)
      .then((campusFreshersFeed: CampusFreshersFeedPostModel[]) => {
        this.campusFreshersFeed = campusFreshersFeed;
      })
      .catch(() => {});
  }

  protected onMobileContentSelect (type): void {
    this.contentTypeOnMobile = type;
  }
}
